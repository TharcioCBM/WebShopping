import math

def paginate(offset,limit,list):
    page = []
    pagination = {
        "total_records": None,
        "current_page": None,
        "total_pages": None,
        "next_page": None,
        "prev_page": None
    }
    if len(list) == 0:
        return page,pagination
    else:
        pagination["total_records"] = len(list)
        pagination["total_pages"] = int(math.ceil(pagination["total_records"]/limit))
        pagination["current_page"] = offset
        if offset > pagination["total_pages"]:
            if offset - 1 == pagination["total_pages"]:
                pagination["prev_page"] = offset - 1
            return page,pagination
        pagination["next_page"] = pagination["current_page"] + 1 if pagination["current_page"] < pagination["total_pages"] else None
        pagination["prev_page"] = pagination["current_page"] - 1 if pagination["current_page"] > 1 else None
        current_item = ((pagination["current_page"]-1)*limit)
        last_item = pagination["total_records"] if limit*offset > pagination["total_records"] else (limit*offset)

        page = []
        while current_item < last_item:
            page.append(list[current_item])
            current_item+=1

        return page,pagination