from flask import Flask, request
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3


app = Flask(__name__)
DATABASE = "users.db"


def get_db():
    return sqlite3.connect(DATABASE)


def init_db():
    db = get_db()
    db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")
    db.commit()
    db.close()


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        
        db = get_db()
        query = "SELECT * FROM users WHERE username = ?"
        user = db.execute(query, (username,)).fetchone()
        db.close()


        if user and check_password_hash(user[2], password):
            return "Login successful"

        return "Invalid username or password"

   

    return """
        <form method="POST">
            <input name="username" placeholder="Username">
            <input name="password" type="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    """


if __name__ == "__main__":
    init_db()
    app.run(debug=False)
