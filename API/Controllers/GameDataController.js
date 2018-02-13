'use strict';

var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');

exports.processRequest = function(req, res) {

   if (req.body.result.action == "schedule") {
    getTeamSchedule(req,res)
  }
  else if (req.body.result.action == "tell.about")
  {
      getTeamStats(req,res)
  }
};

function getTeamStats(req,res)
{

    let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';

    /*let kings = new TeamInfo();
    kings.name = "Sacramento Kings";
    kings.description = "The Sacramento Kings are an American professional basketball team based in Sacramento, California. The Kings compete in the National Basketball Association as a member of the Western Conference Pacific Division.";
    kings.save(function(err,billSaved)
  	{
  		if(err)	return err;
  	});*/

  TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
      {
        if (err)
        {
          return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!',
              source: 'team info'
          });
        }

        if (teamExists)
        {
          return res.json({
                speech: teamExists.description,
                displayText: teamExists.description,
                source: 'team info'
            });
        }
        else {
          console.log('team name is '+teamToSearch);
          return res.json({
                speech: 'Currently I am not having information about this team',
                displayText: 'Currently I am not having information about this team',
                source: 'team info'
            });
        }
      });
}

function getTeamSchedule(req,res)
{
  // let gameSchedule = new GameSchedule();
  // gameSchedule.date = "Feb 11 2018";
  // gameSchedule.opponent = "Minnesota";
  // gameSchedule.hasBeenPlayed = true;
  // gameSchedule.isWinner = false;
  // gameSchedule.score = "111-106";
  // gameSchedule.save(function(err,billSaved)
  // {
  //   if(err)	return err;
  // });

          return res.json({
              speech: 'This module is under development. Schedule will be available soon',
              displayText: 'This module is under development. Schedule will be available soon',
              source: 'game schedule'
          });

}
  //let reqUrl = encodeURI('http://theapache64.xyz:8080/movie_db/search?keyword=' + movieToSearch);
  /*http.get(reqUrl, (responseFromAPI) => {

      responseFromAPI.on('data', function (chunk) {
          let movie = JSON.parse(chunk)['data'];
          let dataToSend = movieToSearch === 'The Godfather' ? 'I don\'t have the required info on that. Here\'s some info on \'The Godfather\' instead.\n' : '';
          dataToSend += movie.name + ' is a ' + movie.stars + ' starer ' + movie.genre + ' movie, released in ' + movie.year + '. It was directed by ' + movie.director;

          return res.json({
              speech: dataToSend,
              displayText: dataToSend,
              source: 'get-movie-details'
          });

      });
  }, (error) => {
      return res.json({
          speech: 'Something went wrong!',
          displayText: 'Something went wrong!',
          source: 'get-movie-details'
      });
  });*/
