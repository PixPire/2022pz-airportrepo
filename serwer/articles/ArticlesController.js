const pool = require("../config/database");
const bodyParser = require('body-parser');
const { application } = require("express");

module.exports = {
    getArticles: (req, res) => {
        pool.query(
            `select id, title, file, thumbnail from articles`,
            [],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    getArticleThumbs: (req, res) => {
      pool.query(
          `select id, title, thumbnail from articles`,
          [],
          (error, results, fields) => {
            if (error) {
              res.send(error);
            }
            else{
              let buf = Buffer.alloc(1);
              let part1 = Buffer.alloc(5);
              let part2;
              let part3;
              let offset = 0;
              buf.writeUint8(results.length);
              for(let i=0; i<results.length; i++)
              {
                part3 = Uint8Array.from(results[i].thumbnail);

                offset = part1.writeUInt8(results[i].title.length);
                //console.log(typeof(part1));
                let numb = part1.writeUInt32BE(part3.length, offset);
                console.log("Uint32 written - 1");
                console.log(numb - 1);
                console.log(part3.length);
                console.log(part1.readUint32BE(1));
                part2 = Buffer.alloc(results[i].title.length);
                part2.write(results[i].title);
                buf = Buffer.concat([buf, part1, part2, part3]);
                console.log("Uint32 read after concat (only first valid):");
                console.log(buf.readUint32BE(2));
              }
              //console.log(results.length);
              //console.log(buf.readUint8());

              console.log(Uint8Array.from(buf));

              res.set({ 'content-type': 'raw; charset=utf-8'});
              //res.type(buf.type);
              res.header('transfer-encoding', '');
              res.write(buf, 'binary');
              res.end(null, 'binary');
            }
          }
        );
    },
    getArticleThumbsNormally: (req, res) => {
      pool.query(
        `select id, title, thumbnail from articles`,
        [],
        (error, results, fields) => {
          if (error) {
            res.send(error);
          }
          else{
            res.send(results);
        }}
      );
    },
    getArticleThumbsWithFormData: (req, res) => {
      pool.query(
          `select id, title, thumbnail from articles`,
          [],
          (error, results, fields) => {
            if (error) {
              res.send(error);
            }
            else{
              var data= new FormData();
              data.append('length', results.length);
              for(let i=0; i<results.length; i++)
              {
                data.append('id'+i, results[i].id);
                data.append('title'+i, results[i].title);
                data.append('thumbnail'+i, results[i].thumbnail);
              }

              //res.set({ 'content-type': 'raw; charset=utf-8'});
              res.header("Content-Type", "multipart/form-data");
              res.write(data);
              res.end();
              //res.send(data);
            }
          }
        );
    },
    getArticleTitles: (req, res) => {
      pool.query(
          `select id, title from articles`,
          [],
          (error, results, fields) => {
            if (error) {
              res.send(error);
            }
            else{
              res.send(results);
          }}
        );
    },
    getArticleBody: (req, res) => {
      pool.query(
          `select file from articles where id = ?`,
          [req.params.id],
          (error, results, fields) => {
            if (error) {
              res.send(error);
            }
            else{
              console.log(req.params.id);
              res.send(results[0]);
            }
          }
        );
    },
    postArticles: (req, res) => {
        //let title_len = Blob(req.body).slice(0,1);
        //let file_len= Blob(req.body).slice(1,5);
        //let thumbnail_len= Blob(req.body).slice(5,10);

        console.log("Request body: %s",req.body);
        console.log("Request session.user %s", req.session.user);
        pool.query(
            `insert into articles(id, title, file, thumbnail, author_id) 
                values(DEFAULT, ?, ?, ?, ?)`,
            [
              req.body.title,
              req.body.file,
              req.body.thumbnail,
              req.session.user.id
                //Blob(req.body.title).slice(10, title_len),
                //Blob(req.body.file).slice(10 + title_len, file_len),
                //Blob(req.body.thumbnail).slice(10 + title_len + file_len, thumbnail_len)
            ],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    createArticles: (req, res) => {
        pool.query(
            `create table articles(
                id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                title varchar(20) NOT NULL,
                file mediumblob NOT NULL,
                thumbnail mediumblob,
                author_id int foreign key references users(id)
                )`,
            [],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    }
}