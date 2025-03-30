from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import db
from models import User

users_bp = Blueprint("users", __name__)

@users_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data["name"]
    email = data["email"]
    password = data["password"]
    role = data["role"]  # "student" or "faculty"

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists!"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@users_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials!"}), 401

    access_token = create_access_token(identity=user.id)  # Using user ID for JWT identity
    return jsonify({"token": access_token, "role": user.role})

@users_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Dummy logic for course recommendations
    recommended_courses = ["Remedial Math", "Writing Skills 101"] if user.low_marks else []

    return jsonify({
        "name": user.name,
        "email": user.email,
        "recommended_courses": recommended_courses
    }), 200
