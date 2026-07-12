from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!, I am a Flask application running in a Docker container! In costa rica'

if __name__ == '__main__':
    app.run(debug=True)