// fetch('./data.json').then((response)=>response.json()).then((data)=>{
//     console.log(data.currentUser.image.png)
//     document.querySelector("#div1").textContent=data.currentUser.username
// })

import data from './data.json' assert {type: 'json'}



function deleteComment(commentBox) {
    let overlayContainer = document.createElement("div")
    let delCommentBox = document.createElement("div")
    let delCommentTitle = document.createElement("h4")
    let delCommentBody = document.createElement("p")
    let delCommentBtns = document.createElement("div")
    let noDelBtn = document.createElement("div")
    let yesDelBtn = document.createElement("div")

    overlayContainer.classList.add("overlay-container")

    delCommentBox.classList.add("del-comment-box")

    delCommentTitle.classList.add("del-comment-title")
    delCommentTitle.appendChild(document.createTextNode("Delete comment"))

    delCommentBody.classList.add("del-comment-body")
    delCommentBody.appendChild(document.createTextNode("Are you sure you \
    want to delete this comment? This will remove the comment and can't be undone."))

    delCommentBtns.classList.add("del-comment-btns")

    noDelBtn.classList.add("no-del-btn")
    noDelBtn.appendChild(document.createTextNode("NO, CANCEL"))

    yesDelBtn.classList.add("yes-del-btn")
    yesDelBtn.appendChild(document.createTextNode("YES, DELETE"))

    delCommentBtns.appendChild(noDelBtn)
    delCommentBtns.appendChild(yesDelBtn)

    delCommentBox.appendChild(delCommentTitle)
    delCommentBox.appendChild(delCommentBody)
    delCommentBox.appendChild(delCommentBtns)

    overlayContainer.appendChild(delCommentBox)

    document.querySelector("body").style.overflow = "hidden"
    document.querySelector(".main").appendChild(overlayContainer)
    
    yesDelBtn.addEventListener("click", function () {
        commentBox.remove()
        overlayContainer.remove()
        document.querySelector("body").style.overflow = ""
    })

    noDelBtn.addEventListener("click",function(){
        overlayContainer.remove()
        document.querySelector("body").style.overflow = ""
    })

}

function createReplyCommentContainer(replyTo, username, imageURL, content, createdAt, score) {
    let hasReplyCommentContainer = replyTo.querySelector(".reply-comment-container") != null
    let replyCommentContainer

    if (hasReplyCommentContainer) {
        replyCommentContainer = replyTo.querySelector(".reply-comment-container")
    } else {
        replyCommentContainer = document.createElement("div")
        replyCommentContainer.classList.add("reply-comment-container")
    }


    let commentBox = document.createElement("div")

    commentBox.classList.add("reply-comment-box")
    commentBox.appendChild(createProfileBox(username, imageURL, createdAt))
    commentBox.appendChild(createContentBox(content, "reply"))
    commentBox.appendChild(createScoreBox(score))

    if (username === "juliusomo") {
        commentBox.appendChild(createDeleteEditBtn())
    } else {
        commentBox.appendChild(createReplyBtn())
    }

    replyCommentContainer.appendChild(commentBox)

    replyTo.appendChild(replyCommentContainer)
}

function toggleUserReplyBox(e) {
    let parent = e.parentElement.parentElement
    let hasUserReplyBox = parent.querySelector(".user-reply-box") != null

    if (hasUserReplyBox === false) {
        let username = parent.querySelector(".profile-name").textContent
        parent.insertBefore(createUserReplyBox(username), parent.firstElementChild.nextSibling)
        parent.querySelector(".user-reply-area").value = `@${username} `
    } else {
        let userReplyBox = parent.querySelector(".user-reply-box")
        userReplyBox.remove()
    }
}

function createUserReplyBox(username) {
    let userReplyBox = document.createElement("div")
    let userImage = document.createElement("img")
    let userReplyArea = document.createElement("textarea")
    let userReplyBtn = document.createElement("div")

    userReplyBox.classList.add("user-reply-box")

    userImage.src = data.currentUser.image.png
    userImage.classList.add("user-profile-image")

    userReplyArea.classList.add("user-reply-area")
    userReplyArea.setAttribute("rows", 5)

    userReplyBtn.classList.add("user-reply-btn")
    userReplyBtn.appendChild(document.createTextNode("REPLY"))

    userReplyBtn.addEventListener("click", function (e) {
        if (userReplyArea.value.trim() != "" && userReplyArea.value.trim() != `@${username}`) {
            let parent = e.target.parentElement.parentElement

            if (parent.classList.contains("reply-comment-container")) {
                parent = parent.parentElement
            }

            createReplyCommentContainer(parent, data.currentUser.username, data.currentUser.image.png
                , userReplyArea.value, "1 second ago", 0)

            userReplyBox.remove()
        }
    })


    userReplyBox.appendChild(userImage)
    userReplyBox.appendChild(userReplyArea)
    userReplyBox.appendChild(userReplyBtn)

    return userReplyBox
}

function updateScore(element, change) {
    let parent = element.parentElement.parentElement
    let score = parent.querySelector(".score-text")
    let val = Number(score.textContent)

    if (change === 1) {
        score.textContent = `${++val}`
    } else {
        score.textContent = `${--val}`
    }
}

function createProfileBox(username, imageURL, created) {
    let profileBox = document.createElement("div")
    let profileImage = document.createElement("img")
    let profileName = document.createElement("span")
    let createdAt = document.createElement("span")
    let youBox = document.createElement("div")

    profileBox.classList.add("profile-box")

    profileImage.classList.add("profile-image")
    profileImage.src = imageURL

    profileName.classList.add("profile-name")
    profileName.appendChild(document.createTextNode(`${username}`))

    createdAt.classList.add("created-at")
    createdAt.appendChild(document.createTextNode(`${created}`))

    youBox.classList.add("you-box")
    youBox.appendChild(document.createTextNode("you"))

    profileBox.appendChild(profileImage)
    profileBox.appendChild(profileName)

    if (username === "juliusomo") {
        profileBox.appendChild(youBox)
    }

    profileBox.appendChild(createdAt)

    return profileBox
}

function createContentBox(content, val) {
    let contentBox = document.createElement("div")

    contentBox.classList.add("content-box")

    if (val === "comment") {
        contentBox.appendChild(document.createTextNode(`${content}`))
    } else {
        let arr = content.split(" ")
        contentBox.innerHTML = `<span style="color:hsl(238, 40%, 52%);font-weight:500;">${arr[0]}</span> ${content.substring(content.indexOf(" ") + 1)}`
    }

    return contentBox
}

function createScoreBox(score) {
    let scoreBox = document.createElement("div")
    let scoreText = document.createElement("span")
    let plusIcon = document.createElementNS('http://www.w3.org/2000/svg', "svg")
    let plusPath = document.createElementNS('http://www.w3.org/2000/svg', "path")
    let minusIcon = document.createElementNS('http://www.w3.org/2000/svg', "svg")
    let minusPath = document.createElementNS('http://www.w3.org/2000/svg', "path")

    scoreBox.classList.add("score-box")

    scoreText.classList.add("score-text")
    scoreText.appendChild(document.createTextNode(`${score}`))

    plusIcon.setAttribute("width", 11)
    plusIcon.setAttribute("height", 11)

    plusPath.classList.add("plus-minus-icon")
    plusPath.setAttribute("d", "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z")
    plusPath.setAttribute("fill", "#C5C6EF")

    plusIcon.appendChild(plusPath)

    minusIcon.setAttribute("width", 11)
    minusIcon.setAttribute("height", 5)

    minusPath.classList.add("plus-minus-icon")
    minusPath.setAttribute("d", "M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z")
    minusPath.setAttribute("fill", "#C5C6EF")

    minusIcon.appendChild(minusPath)

    scoreBox.appendChild(plusIcon)
    scoreBox.appendChild(scoreText)
    scoreBox.appendChild(minusIcon)


    //path of svg element is targeted rather than svg element
    plusPath.addEventListener("click", function (e) {
        updateScore(e.target, 1)
    })

    minusPath.addEventListener("click", function (e) {
        updateScore(e.target, -1)
    })

    return scoreBox
}

function createReplyBtn() {
    let replyBtn = document.createElement("div")
    let replyIcon = document.createElement("img")
    let replyText = document.createElement("span")

    replyBtn.classList.add("reply-btn")

    replyIcon.src = './images/icon-reply.svg'

    replyText.classList.add("reply-text")
    replyText.appendChild(document.createTextNode("Reply"))

    replyBtn.appendChild(replyIcon)
    replyBtn.appendChild(replyText)

    replyBtn.addEventListener("click", function () {
        toggleUserReplyBox(replyBtn)
    })

    return replyBtn
}


function createDeleteEditBtn() {
    let deleteEditBox = document.createElement("div")
    let deleteBtn = document.createElement("div")
    let deleteIcon = document.createElement("img")
    let deleteText = document.createElement("span")
    let editBtn = document.createElement("div")
    let editIcon = document.createElement("img")
    let editText = document.createElement("span")

    deleteEditBox.classList.add("delete-edit-box")

    deleteBtn.classList.add("del-btn")
    deleteIcon.src = './images/icon-delete.svg'
    deleteText.classList.add("del-text")
    deleteText.appendChild(document.createTextNode("Delete"))

    deleteBtn.appendChild(deleteIcon)
    deleteBtn.appendChild(deleteText)

    editBtn.classList.add("edit-btn")
    editIcon.src = './images/icon-edit.svg'
    editText.classList.add("edit-text")
    editText.appendChild(document.createTextNode("Edit"))

    editBtn.appendChild(editIcon)
    editBtn.appendChild(editText)

    deleteEditBox.appendChild(deleteBtn)
    deleteEditBox.appendChild(editBtn)

    editBtn.addEventListener("click", function () {
        let parentbox = editBtn.parentElement.parentElement
        let contentBox = parentbox.querySelector(".content-box")
        let content = contentBox.textContent
        let editTextarea = document.createElement("textarea")
        let updateBtn = document.createElement("div")

        contentBox.remove()
        deleteEditBox.style.display = "none"

        editTextarea.classList.add("edit-textarea")
        editTextarea.setAttribute("rows", 5)
        editTextarea.value = content

        updateBtn.classList.add("update-btn")
        updateBtn.appendChild(document.createTextNode("UPDATE"))

        parentbox.append(editTextarea)
        parentbox.append(updateBtn)

        updateBtn.addEventListener("click", function () {
            if (parentbox.classList.contains("reply-comment-box")) {
                contentBox = createContentBox(editTextarea.value, "reply")
            } else {
                contentBox = createContentBox(editTextarea.value, "comment")
            }
            contentBox.classList.add("content-box")
            deleteEditBox.style.display = "flex"

            parentbox.appendChild(contentBox)

            editTextarea.remove()
            updateBtn.remove()
        })
    })

    deleteBtn.addEventListener("click", function () {
        deleteComment(deleteBtn.parentElement.parentElement)
    })

    return deleteEditBox
}

function createFirstLevelCommentBox(username, imageURL, content, createdAt, score) {
    let commentBox = document.createElement("div")

    commentBox.classList.add("comment-box")

    commentBox.appendChild(createProfileBox(username, imageURL, createdAt))
    commentBox.appendChild(createContentBox(content, "comment"))
    commentBox.appendChild(createScoreBox(score))

    if (username === "juliusomo") {
        commentBox.appendChild(createDeleteEditBtn())
    } else {
        commentBox.appendChild(createReplyBtn())
    }

    return commentBox
}

function createCommentContainer(username, imageURL, content, createdAt, score) {
    let commentContainer = document.createElement("div")


    commentContainer.classList.add("comment-container")

    commentContainer.appendChild(createFirstLevelCommentBox(username, imageURL, content, createdAt, score))

    return commentContainer
}

function createUserCommentBox() {
    let userCommentBox = document.createElement("div")
    let userImage = document.createElement("img")
    let userCommentArea = document.createElement("textarea")
    let userCommentSendBtn = document.createElement("div")

    userCommentBox.classList.add("user-comment-box")

    userImage.src = data.currentUser.image.png
    userImage.classList.add("user-profile-image")

    userCommentArea.classList.add("user-comment-area")
    userCommentArea.setAttribute("rows", 5)
    userCommentArea.setAttribute("placeholder", "Add a comment...")

    userCommentSendBtn.classList.add("user-comment-send-btn")
    userCommentSendBtn.appendChild(document.createTextNode("SEND"))

    userCommentSendBtn.addEventListener("click", function () {
        if (userCommentArea.value.trim() != "") {
            let commentContainer = createCommentContainer(data.currentUser.username,
                data.currentUser.image.png, userCommentArea.value, "1 second ago", 0)

            document.querySelector(".main").insertBefore(commentContainer, userCommentBox)

            userCommentArea.value = ""
        }
    })


    userCommentBox.appendChild(userImage)
    userCommentBox.appendChild(userCommentArea)
    userCommentBox.appendChild(userCommentSendBtn)

    return userCommentBox
}


for (let index = 0; index < data.comments.length; index++) {
    const comment = data.comments[index];
    let commentContainer = createCommentContainer(comment.user.username, comment.user.image.png, comment.content, comment.createdAt, comment.score)

    document.querySelector(".main").appendChild(commentContainer)

    for (let i = 0; i < comment.replies.length; i++) {
        const reply = comment.replies[i];

        let content = `@${reply.replyingTo} ${reply.content}`
        createReplyCommentContainer(commentContainer, reply.user.username,
            reply.user.image.png, content, reply.createdAt, reply.score)

    }

}

document.querySelector(".main").appendChild(createUserCommentBox())