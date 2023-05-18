# Q1 line 1 to 24 
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

# Q2 line 26 to 35 
def filter_by_tags(polls_data, list_of_tags):
    filtered_data = []
    for poll in polls_data:
        tags = poll['Tags']
        for tag in tags:
            for x in list_of_tags:
                if x in tag:
                    filtered_data.append(poll)
    return filtered_data

#Q3 line 37 to 

def view_poll(poll_data, pollNumber):
    item = poll_data[pollNumber]
    print("\n",item['Question'])
    options,votes = item['Options'],item['Votes'] #Deconstruting 
    for option,vote in zip(options,votes):
            print('\n' + option + ':' + vote)
    print("\nTags: ")
    for tag in item['Tags']:
        print(tag, end=' ')
    




if __name__ == "__main__":
    filepath = "./polldata.fps"
    print("\nQ1 : Making List of dictionary")
    data = load_fps(filepath)
    #for x in data:
       # print("\n",x)

    print("\n Q2 : Output of filtered data by tag")
    data2 = filter_by_tags(data, ['phones', 'cricket'])
    #for x in data2:
        #print("\n",x)

    print("\n Q3 : Printing the question and poll results")
    qs_no = int(input("Enter the Question Number"))
    view_poll(data,qs_no)