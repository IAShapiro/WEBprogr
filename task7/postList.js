class PostList {
    _posts = [];

    constructor(posts) {
        this.addAll([...posts]);
    }

    static validate(post) {
        let arrField = [false, false, false, false];
        for (let field in post) {
            switch(field) {
                case "id":
                    if (!post.id || typeof post.id !== "string") {
                        return false;
                    }

                    arrField[0] = true;
                    break;
                case "description":
                    if (!post.description || typeof post.description !== "string" || post.description.length >= 200) {
                        return false;
                    }

                    arrField[1] = true;
                    break;
                case "createdAt":
                    if (!post.createdAt || !(post.createdAt instanceof Date)) {
                        return false;
                    }

                    arrField[2] = true;
                    break;
                case "author":
                    if (!post.author || typeof post.author !== "string" || post.author.length === 0) {
                        return false;
                    }

                    arrField[3] = true;
                    break;
                case "photoLink": // TODO May by add validation of links(?)
                    if (post.photoLink && typeof post.photoLink !== "string") {
                        return false;
                    }
                    break;
                case "hashTags":
                    if (post.hashTags) {
                        if (!Array.isArray(post.hashTags)) {
                            return false;
                        }

                        for (let tag in post.hashTags) { // TODO May by add validation of tags(?)
                            if (typeof tag !== "string") {
                                return false;
                            }
                        }
                    }
                    break;
                case "likes":
                    if (post.likes) {
                        if (!Array.isArray(post.likes)) {
                            return false;
                        }

                        for (let like in post.likes) {
                            if (typeof like !== "string") {
                                return false;
                            }
                        }
                    }
                    break;
                default:
                    return false;
            }
        }

        return arrField[0] && arrField[1] &&arrField[2] &&arrField[3];
    }

    getPage(skip = 0, top = 10, filterConfig = undefined) {

        if (typeof skip !== "number" || typeof top !== "number") {
            console.log("Error!");

            return;
        }

        let resultPosts = this._posts;

        if (filterConfig) {
            for (let filterType in filterConfig) {
                switch (filterType) {
                    case "author":
                        resultPosts = resultPosts.filter(post => post.author === filterConfig.author);
                        break;
                    case "dateBegin":
                        resultPosts = resultPosts.filter(post => (filterConfig.dateBegin <= post.createdAt));
                        break;
                    case "dateEnd":
                        resultPosts = resultPosts.filter(post => (post.createdAt <= filterConfig.dateEnd));
                        break;
                    case "hashTags":
                        for (let tag in filterConfig.hashTags) {
                            resultPosts = resultPosts.filter(post => post.hashTags.includes(tag));
                        }
                        break;
                    default:
                        console.log("Error!");

                        return;
                }
            }
        }

        resultPosts.sort(function (post1, post2) {
            return post2.createdAt - post1.createdAt;
        });

        return resultPosts.slice(skip, skip + top);
    }

    get(id) {
        if (typeof id !== "string") {
            console.log("Error!");

            return;
        }

        return this._posts.find(post => post.id === id);
    }

    add(post) {
        if (PostList.validate(post)) {
            this._posts.push(post);

            return true;
        }

        return false;
    }

    edit(id, postEdit) {
        function validateEditPost(post) {
            for (let field in post) {
                switch(field) {
                    case "id":
                    case "author":
                    case "createdAt":
                        return false;
                    case "description":
                        if (!post.description || typeof post.description !== "string" || post.description.length >= 200) {
                            return false;
                        }
                        break;
                    case "hashTags":
                        if (post.hashTags) {
                            if (!Array.isArray(post.hashTags)) {
                                return false;
                            }

                            for (let tag in post.hashTags) {
                                if (typeof tag !== "string") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case "likes":
                        if (post.likes) {
                            if (!Array.isArray(post.likes)) {
                                return false;
                            }

                            for (let like in post.likes) {
                                if (typeof like !== "string") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case "photoLink":
                        if (post.photoLink && typeof post.photoLink !== "string") {
                            return false;
                        }
                        break;
                    default:
                        return false;
                }
            }

            return true;
        }

        if (!validateEditPost(postEdit)) {
            return false;
        }

        let post = this.get(id);
        if (!post) {
            return false;
        }

        for (let field in postEdit) {
            post[field] = postEdit[field];
        }

        return true;
    }

    remove(id) {
        if (typeof id === "string") {
            for (let i = 0; i < this._posts.length; i++) {
                if (this._posts[i].id === id) {
                    this._posts.splice(i, 1);

                    return true;
                }
            }
        }

        return false;
    }

    addAll(posts) {
        let incorrectPosts = [];

        posts.forEach(post => {
            if (!this.add(post)) {
                incorrectPosts.push(post);
            }
        });

        return incorrectPosts;
    }

    clear() {
        this._posts.length = 0;
    }

    like(id, author) {
        if (typeof id !== "string" || typeof author !== "string") {
            return false;
        }

        let post = this.get(id);

        if (!post) {
            return false;
        }

        let index;

        if (post.likes) {
            index = post.likes.find(name => name === author)

            if (!index) {
                post.likes.push(author);
            }
            else {
                post.likes.splice(index, 1);
            }
        }
        else {
            post.likes = [];
            post.likes.push(author);
        }

        return true;
    }
}

//Tests
let posts = [
    {
        id: "1",
        description: "Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Иванов Иван",
        photoLink: "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
        hashTags: [
            "corona", "tagID1"
        ],
        likes: [
            "Шапиро Игорь"
        ]
    },
    {
        id: "2",
        description: "2",
        createdAt: new Date("2020-03-22T20:26:00"),
        author: "Шапиро Игорь",
        photoLink: "2.jpg",
        hashTags: [
            "tagID2"
        ],
        likes: [
            "Иванов Иван", "Шапиро Игорь"
        ]
    },
    {
        id: "3",
        description: "3",
        createdAt: new Date("2019-12-21T23:23:23"),
        author: "Иванов Иван",
        photoLink: "3.jpg",
        hashTags: [
            "tagID3"
        ],
        likes: [
            "Шапиро Игорь"
        ]
    },
    {
        id: "4",
        description: "4",
        createdAt: new Date("2020-03-21T22:30:00"),
        author: "Валентинов Валентин",
        photoLink: "4.jpeg",
        hashTags: [
            "tagID4"
        ],
        likes: [
            "Шапиро Игорь", "Иванов Иван"
        ]
    },
    {
        id: "5",
        description: "5",
        createdAt: new Date("2020-03-17T11:11:00"),
        author: "Шапиро Игорь",
        photoLink: "5.jpg",
        hashTags: [
            "tagID5"
        ],
        likes: [
            "Валентинов Валентин", "Шапиро Игорь", "Иванов Иван"
        ]
    },
    {
        id: "6",
        description: "6",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Иванов Иван",
        photoLink: "6.jpg",
        hashTags: [
            "tagID6"
        ],
        likes: [
            "Валентинов Валентин"
        ]
    },
    {
        id: "7",
        description: "7",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Шапиро Игорь",
        photoLink: "7.jpg",
        hashTags: [
            "tagID7"
        ],
        likes: [
            "Валентинов Валентин", "Иванов Иван"
        ]
    },
    {
        id: "8",
        description: "8",
        createdAt: new Date("2020-03-21T22:30:00"),
        author: "Шапиро Игорь",
        photoLink: "8.jpeg",
        hashTags: [
            "tagID8"
        ],
        likes: [
            "Валентинов Валентин", "Иванов Иван"
        ]
    },
    {
        id: "9",
        description: "9",
        createdAt: new Date("2019-12-21T23:23:23"),
        author: "Шапиро Игорь",
        photoLink: "9.jpg",
        hashTags: [
            "tagID9"
        ],
        likes: [
        ]
    },
    {
        id: "10",
        description: "10",
        createdAt: new Date("2020-03-22T20:26:00"),
        author: "Иванов Иван",
        photoLink: "10.png",
        hashTags: [
            "tagID10"
        ],
        likes: [
        ]
    },
    {
        id: "11",
        description: "11",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Иванов Иван",
        photoLink: "11.jpg",
        hashTags: [
            "tagID11"
        ],
        likes: [
            "Иванов Иван"
        ]
    },
    {
        id: "12",
        description: "12",
        createdAt: new Date("2020-03-22T20:26:00"),
        author: "Шапиро Игорь",
        photoLink: "12.jpg",
        hashTags: [
            "tagID12"
        ],
        likes: [
            "Иванов Иван"
        ]
    },
    {
        id: "13",
        description: "13",
        createdAt: new Date("2019-12-21T23:23:23"),
        author: "Валентинов Валентин",
        photoLink: "13.jpg",
        hashTags: [
            "tagID13"
        ],
        likes: [
            "Валентинов Валентин", "Иванов Иван"
        ]
    },
    {
        id: "14",
        description: "14",
        createdAt: new Date("2020-03-21T22:30:00"),
        author: "Валентинов Валентин",
        photoLink: "14.jpeg",
        hashTags: [
            "tagID14"
        ],
        likes: [
            "Валентинов Валентин"
        ]
    },
    {
        id: "15",
        description: "15",
        createdAt: new Date("2020-03-17T11:11:00"),
        author: "Семенов Семен",
        photoLink: "15.jpg",
        hashTags: [
            "tagID15"
        ],
        likes: [
            "Семенов Семен", "Валентинов Валентин", "Иванов Иван"
        ]
    },
    {
        id: "16",
        description: "16",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Иванов Иван",
        photoLink: "16.jpg",
        hashTags: [
            "tagID16"
        ],
        likes: [
            "Иванов Иван"
        ]
    },
    {
        id: "17",
        description: "17",
        createdAt: new Date("2020-03-17T23:00:00"),
        author: "Семенов Семен",
        photoLink: "17.jpg",
        hashTags: [
            "tagID17"
        ],
        likes: [
            "Семенов Семен", "Валентинов Валентин", "Иванов Иван"
        ]
    },
    {
        id: "18",
        description: "18",
        createdAt: new Date("2020-03-21T22:30:00"),
        author: "Валентинов Валентин",
        photoLink: "18.jpeg",
        hashTags: [
            "tagID18"
        ],
        likes: [
            "Семенов Семен", "Валентинов Валентин"
        ]
    },
    {
        id: "19",
        description: "19",
        createdAt: new Date("2019-12-21T23:23:23"),
        author: "Семенов Семен",
        photoLink: "19.jpg",
        hashTags: [
            "tagID19"
        ],
        likes: [
            "Семенов Семен", "Иванов Иван"
        ]
    },
    {
        id: "20",
        description: "20",
        createdAt: new Date("2020-03-22T20:26:00"),
        author: "Валентинов Валентин",
        photoLink: "20.jpg",
        hashTags: [
            "tagID20"
        ],
        likes: [
            "Иванов Иван"
        ]
    }
];

testClass = new PostList([...posts]);
console.log(testClass.getPage(0, 10, {}));

console.log(testClass.get("1"));
testClass.edit("1", { photoLink: "https://delo.ua/files/news/images/3646/4/picture2_koronavirus-poluc_364604_p0.jpg" });
console.log(testClass.get("1"));

console.log(testClass.get("7000000"));
console.log(testClass.get(1));

console.log(testClass.getPage(7,2, {author: "Иванов Иван"}));
console.log(testClass.getPage(7,2, {auor: "Иванов Иван"}));

console.log(PostList.validate({id: "7",
    description: "7",
    createdAt: new Date("2020-03-17T23:00:00"),
    author: "Шапиро Игорь",
    photoLink: "7.jpg",
    hashTags: [
        "tagID7"
    ],
    likes: [
        "Валентинов Валентин", "Иванов Иван"
    ]}));
console.log(PostList.validate({
    description: "7",
    createdAt: new Date("2020-03-17T23:00:00"),
    author: "Шапиро Игорь",
    photoLink: "7.jpg",
    hashTags: [
        "tagID7"
    ],
    likes: [
        "Валентинов Валентин", "Иванов Иван"
    ]}));
console.log(PostList.validate({id: "7",
    description: "7",
    createdAt: new Date("2020-03-17T23:00:00"),
    author: "Шапиро Игорь",
    photoLink: "7.jpg",
}));
console.log(PostList.validate({id: "7",
    description: "7",
    createdAt: new Date("2020-03-17T23:00:00"),
    author: "Шапиро Игорь",
    photoLink: "7.jpg",
    hashTags: [
        "tagID7"
    ],
    likes: [
        "Валентинов Валентин", "Иванов Иван"
    ],
    fieldErr: "1"}));

testClass.add({id: "21", createdAt: new Date(), description: "ID 21", author: "Шапиро Игорь"});
console.log(testClass.get("21"));

console.log(testClass.edit("21", { id: "22" }));
console.log(testClass.like("21", "Шапиро Игорь"));
console.log(testClass.get("21"));
console.log(testClass.like("21", "Шапиро Игорь"));
console.log(testClass.get("21"));

console.log(testClass.remove("21"));
console.log(testClass.get("21"));
console.log(testClass.like("21", "Шапиро Игорь"));
