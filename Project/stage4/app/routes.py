from . import app
from flask import request, jsonify, make_response
from . import database as db_helper


@app.route("/")
def homepage():
    return jsonify({"status": "OK"})

@app.route('/videos', methods=['GET'])
def check_videos():
        ret_val = db_helper.fetch_videos()
        return ret_val
@app.route('/videos/insert', methods=['POST'])
def insert_video():
    data = request.get_json()
    ret_val = db_helper.insert_new_video(data['Title'], data['Channel_Id'], data['Category_Id'], data['Tag_Name'], data['Publish_time'])
    return ret_val

@app.route('/videos/delete/<string:video_id>', methods=['DELETE'])
def delete_video(video_id):
    ret_val = db_helper.remove_video_by_id(video_id)
    return ret_val
@app.route('/videos/update/<string:video_id>', methods=['PUT'])
def update_video(video_id):
    data = request.get_json()
    ret_val = db_helper.update_video_by_id(video_id, data)
    return ret_val
@app.route('/videos/<string:video_id>', methods=['GET'])
def search_video(video_id):
    ret_val = db_helper.search_video_by_title(video_id)
    return ret_val