import string
import random
from . import db

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
    except:
        conn.close()
        return False
    conn.close()
    return True


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
    return ret_res


def remove_video_by_id(video_id):
    conn = db.connect()
    query = f'DELETE FROM Video WHERE Video_id = "{video_id}";'
    try:
        conn.execute(query)
    except:
        conn.close()
        return False
    conn.close()
    return True