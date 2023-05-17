# line 1 to 24 Q1
def load_fps(filepath):
    with open(filepath, 'r') as file:
        lines = file.readlines()[1:]

    lines = [line.strip().split("::") for line in lines]

    result = []
    for line in lines:
        question = line[0]
        options = line[1].strip().split("|")
        votes = line[2].strip().split("|")
        tag = line[3].strip().split("|")
    
        item = {
            "Question" : question,
            "Options"  : options,
            "Votes"    : votes,
            "Tags"     : tag
        }

        result.append(item)

    return(result)

# line 26 Q2
def filter_by_tags(polls_data, list_of_tags):
    filtered_data = []
    for poll in polls_data:
        tags = poll['Tags']
        print(tags)
        for tag in tags:
            if tag in list_of_tags:
                print(tag)
    return filtered_data



if __name__ == "__main__":
    filepath = "./polldata.fps"
    data = load_fps(filepath)

    #print(data)

   # for x in data:
       # print(x)

    data2 = filter_by_tags(data, ['phones', 'cricket'])
    print(data2)
