import string
import random
from . import db
from flask import jsonify, make_response

def generate_video_id():
    chars = string.ascii_letters + string.digits

    random_string = ''.join(random.choice(chars) for _ in range(10))

    hash_code = f"_{random_string}"

    return hash_code
def insert_new_video(Title, Channel_Id, Category_Id, Tag_Name, Publish_time) -> bool:
    conn = db.connect()
    query = f'INSERT INTO Video (Video_id, Title, Channel_Id, Category_Id, Tag_Name, Publish_time) VALUES ("{generate_video_id()}", "{Title}", "{Channel_Id}", "{Category_Id}", "{Tag_Name}", "{Publish_time}");'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def fetch_videos():
    conn = db.connect()
    query = 'SELECT * FROM Video;'
    query_results = conn.execute(query)
    conn.close()
    ret_res = []
    for result in query_results:
        item = {
            "Video_id": result[0],
            "Title": result[1],
            "Channel_Id": result[2],
            "Category_Id": result[3],
            "Tag_Name": result[4],
            "Publish_time": result[5]
        }
        ret_res.append(item)
    return make_response(jsonify(ret_res), 200)


def remove_video_by_id(video_id):
    conn = db.connect()
    query = f'DELETE FROM Video WHERE Video_id = "{video_id}";'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def update_video_by_id(video_id, inp):
    conn = db.connect()
    original_data = conn.execute(f'SELECT * FROM Video WHERE Video_id = "{video_id}";')
    if original_data is None:
        return make_response({"success": False, "response": "Video not found"}, 400)
    original_data_dict = original_data.mappings().all()[0]
    title = inp.get('Title', original_data_dict["Title"])
    tag_name = inp.get('Tag_Name', original_data_dict["Tag_Name"])
    publish_time = inp.get('Publish_time', original_data_dict["Publish_time"])
    query = f'UPDATE Video SET Title = "{title}", Tag_Name = "{tag_name}", Publish_time = "{publish_time}" WHERE Video_id = "{video_id}";'
    try:
        conn.execute(query)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    conn.close()
    return make_response({"success": True, "response": "Done"}, 200)


def search_video_by_title(Title):
    conn = db.connect()
    query = f"SELECT * FROM Video WHERE Title LIKE '%%{Title}%%';"
    ret_res = []
    try:
        query_results = conn.execute(query)
        for result in query_results:
            item = {
                "Video_id": result[0],
                "Title": result[1],
                "Channel_Id": result[2],
                "Category_Id": result[3],
                "Tag_Name": result[4],
                "Publish_time": result[5]
            }
            ret_res.append(item)
    except Exception as e:
        conn.close()
        return make_response({"success": False, "response": f"{e}"}, 400)
    return make_response(jsonify(ret_res), 200)