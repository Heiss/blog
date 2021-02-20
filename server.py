from flask import Flask, render_template, request, redirect, url_for
from flask_login import LoginManager, login_user, UserMixin, login_required, logout_user, current_user
from flask_socketio import SocketIO, disconnect, emit

import uuid
import functools
import logging

logging.basicConfig(level=logging.DEBUG)
LOGGER = logging.getLogger()


app = Flask(__name__, template_folder="dist",
            static_folder="dist", static_url_path="")
app.config['SECRET_KEY'] = uuid.uuid4()
socketio = SocketIO(app)

login_manager = LoginManager()

# temporary user_store
user_store = {}
# connected clients
clients = {}


class User(UserMixin):
    def __init__(self, id, userId):
        super().__init__()
        self.id = id
        self.userId = userId


@login_manager.user_loader
def load_user(user_id):
    return user_store.get(user_id)


def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not current_user.is_authenticated:
            disconnect()
        else:
            return f(*args, **kwargs)
    return wrapped


@app.route("/")
def index():
    user = User(id=uuid.uuid4(), userId=None)
    user_store[user.get_id()] = user
    login_user(user)

    return render_template("index.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


@socketio.on("connect")
def connected():
    LOGGER.info("{} connected")

    if current_user.is_authenticated:
        clients[current_user.get_id()] = request.sid
    else:
        logout_user()
        disconnect()


@socketio.on("disconnect")
def disconnect():
    LOGGER.info("{} disconnected")

    if __name__ == "__main__":
        return

    del clients[current_user.userId]
    logout_user()


if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080)
