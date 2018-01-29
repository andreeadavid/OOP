class Model {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com'
    }

    getPosts() {
      return fetch(`${this.baseUrl}/posts`).then(response => response.json());
    }

    getPostById(id) {
      return fetch(`${this.baseUrl}/posts/${id}`).then(response => response.json());
    }

    getCommentsForPost(postId) {
      return fetch(`${this.baseUrl}/posts/${postId}/comments`).then(response => response.json());
    }
  }

  class View {
    constructor() {
      this.model = new Model();
      this.id = this.getUrlParam("id");
      if(!this.id) {
        this.showPostsList();
      } else {
        this.showPostAndComments();
      }
    }

    showPostsList() {
      //make html and put data
      let self =  this
      let posts = this.model.getPosts();
      let ul = document.getElementById('posts');
      let p = document.createElement('p');
      posts.then(result => {
        result.map(post => {
          let li = self.createNode("li"),
            link = self.createNode("a"),
            title = self.createNode("p"),
            text = self.createNode("p"),
            body = self.createNode("p");
           link.setAttribute("href", `article.html?id=${post.id}`)
            title.innerHTML =  post.id;
            text.innerHTML = post.title;
            body.innerHTML = post.body;
            self.append(link, title);
            self.append(link, text);
            self.append(link, body);
            self.append(li, link);
            self.append(ul, li);
        });
      });
    }

    showPostAndComments() {
      let post = this.model.getPostById(this.id);
      let self = this;
      post.then(res => {
        
        let divElem = document.getElementById("demo");
        let div = self.createNode("div"),
            title = self.createNode("p"),
            text = self.createNode("p"),
            body = self.createNode("p");
            div.classList.add('title');
            title.innerHTML = res.id;
            text.innerHTML =  res.title;
            body.innerHTML =  res.body;
            self.append(div, title);
            self.append(div, text);
            self.append(div, body);
            self.append(divElem, div);
          
        this.model.getCommentsForPost(res.id).then(comments => { 
          comments.map(comment => {
            let commentDiv = self.createNode("div"),
            name = self.createNode("p"),
            body = self.createNode("p");
            name.innerHTML = comment.name;
            body.innerHTML = comment.body;
            commentDiv.classList.add("comment")
            self.append(commentDiv, name);
            self.append(commentDiv, body);
            self.append(divElem, commentDiv);
          })
        })
      })
    }
    createNode(element) {
      return document.createElement(element);
    }
    append(parent, el) {
      return parent.appendChild(el);

    }
    getUrlParam(name) {
      let results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
      if (results == null) {
        return null;
      } else {
        return results[1] || 0;
      }
    }
  }

var postView = new View();

function goBack() {
  window.history.back();
}










// function createNode(element) {
  //   return document.createElement(element);
  // }
  
  // function append(parent, el) {
  //   return parent.appendChild(el);
  // }
  
  // let ul = document.getElementById('authors');


//   fetch(url)
//   .then(resp => resp.json()).then(data => {
//  let post = data;
//  return posts.map(post => {
//    let li = createNode('li'),
//    title = createNode('p'),
//    text = createNode('p'),
//    body = createNode('p')

//   title.innerHTML =  post.id;
//   text.innerHTML =  post.title;
//   body.innerHTML =  post.body;
//   append(li, title);
//   append(li, text);
//   append(li, body);
//   append(ul, li);
//  }); });


// var elems = document.getElementsByTagName('ul');
// for (var i = 0; i < elems.length; i++) {
//    elems[i].onclick = clickHandler;
// }

// function clickHandler(){
//  window.location = "article.html" 
// }

// function getUrlParam(name){
//   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//  if (results==null){
//  return null;
//   }
//  else{
//  return results[1] || 0;
//  }
// }

// function goBack() {
//     window.history.back();
      
// }



