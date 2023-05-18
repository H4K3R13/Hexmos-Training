import json
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

#Q3 line 37 to 47

def view_poll(poll_data, pollNumber):
    item = poll_data[pollNumber]
    print("\n",item['Question'])
    options,votes = item['Options'],item['Votes'] #Deconstruting 
    for option,vote in zip(options,votes):
            print('\n' + option + ':' + vote)
    print("\nTags: ")
    for tag in item['Tags']:
        print(tag, end=' ')
    
#Q4 line 49 to 58
def update_poll(poll_data, pollNumber, option):
    #print(poll_data)
    options = poll_data[pollNumber]['Options']
    #print(options)
    votes = poll_data[pollNumber]['Votes']
    #print(votes)
    index = options.index(option+' ')
    votes[index] = str(int(votes[index].strip()) + 1)
    return poll_data

#Q5 line 60
def save_poll(poll_data, filename):
   with open(filename, 'w') as file:
        json.dump(poll_data, file)

if __name__ == "__main__":
    filepath = "./polldata.fps"
    print("\nQ1 : Making List of dictionary")
    data = load_fps(filepath)
    for x in data:
       print("\n",x)

    print("\n Q2 : Output of filtered data by tag")
    data2 = filter_by_tags(data, ['phones', 'cricket'])
    for x in data2:
        print("\n",x)

    print("\n Q3 : Printing the question and poll results")
    qs_no = int(input("Enter the Question Number"))
    view_poll(data,qs_no)

    print("\n Q4 : Voting the option")
    updated_data = update_poll(data,1,'Yes')
    print(updated_data)

    print("\n Q5 : Saving the update_data to update_polldata.fps")
    save_poll(updated_data,"updated_poll.json")



