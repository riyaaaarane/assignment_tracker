from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.users import users_bp
from routes.assignments import assignments_bp
from database import db


app = Flask(__name__)

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assignments.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "your_secret_key"

# Initialize Extensions
db.init_app(app)
jwt = JWTManager(app)
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers=["Authorization", "Content-Type"])


# Register Blueprints
app.register_blueprint(users_bp, url_prefix='/auth')
app.register_blueprint(assignments_bp, url_prefix='/assignments')

# Ensure Database is Created
with app.app_context():
    db.create_all()

# Root Route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Assignment Manager API"}), 200

# Error Handling (404)
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
 
