import _ from 'lodash';

  const posts = [
         {id: 1,
            title: 'India - Tiger population sees 30% increase.',
            link: 'http://www.bbc.com/news/world-asia-30896028',
            username: 'jbloggs',
            comments: [],
            upvotes: 10,
          },
         {
            id: 2,
            title: 'The button that is not.',
            link: 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
            username: 'notme',
            comments: [],
            upvotes: 12,
          },
          {
            id: 3,
            title: 'Google Nears $1B Investment in SpaceX',
            link: null,
            username: 'notme',
            comments: [],
            upvotes: 12,
          },
          {
            id: 4,
            title: 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
            link: 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
            username: 'psmith',
            comments: [],
            upvotes: 2,
          },
      ];

        const stubAPI = {
         getAll: () => {
            return posts;
          },
         add: (t, l) => {
              if (!(t && l)) return false;
              let id = 1;
              const last = _.last(posts);
              if (last) {
                 id = last.id + 1;
              }
              let len = posts.length;
              let newLen = posts.push({
                  'id': id,
                 'title': t, 'link': l, 'username': '', 'comments': [], 'upvotes': 0});
               return newLen > len?id:-1;
              },
         upvote: (id) => {
             const index = _.findIndex(posts,
                   (post) => {
                    return post.id == id;
                  } );
             if (index !== -1) {
                  posts[index].upvotes += 1;
                  return true;
                }
              return false;
           },
         getPost: (id) => {
            let result = null;
            const index = _.findIndex(posts,
                   (post) => {
                    return post.id == id;
                  } );
             if (index !== -1) {
                result = posts[index];
                    }
            return result;
            },
         addComment: (postId, c, n) => {
            let result = false;
            const post = stubAPI.getPost(postId);
            let id = 1;
            if (post) {
            const last = _.last(post.comments);
            if (last) {
               id = last.id + 1;
            }
            post.comments.push({'id': id,
                     'comment': c, 'author': n, 'upvotes': 0} );
            result = true;
            }
          return result;
            },
         upvoteComment: (postId, commentId) => {
            let result = false;
            const post = stubAPI.getPost(postId);
            if (post) {
            const index = _.findIndex(post.comments, (c) => {
                      return c.id == commentId;
                    });
             if (index !== -1) {
                 post.comments[index].upvotes += 1;
                 result = true;
                }
              }
            return result;
          },
      };
    export default stubAPI;