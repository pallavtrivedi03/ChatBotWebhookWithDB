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

  let parameters = req.body.result.parameters;
  if (parameters.team1 == "")
  {
    let game_occurence = parameters.game_occurence;
    let team = parameters.team;
    if (game_occurence == "previous")
    {
      //previous game
      GameSchedule.find({opponent:team},function(err,games)
      {
        if (err)
        {
          return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!',
              source: 'game schedule'
          });
        }
        if (games)
        {
          var requiredGame;
          for (var i=0; i < games.length; i++)
          {
              var game = games[i];

              var convertedCurrentDate = new Date();
              var convertedGameDate = new Date(game.date);
              console.log('converted game date is -------> '+convertedGameDate);
              console.log('converted current date is -------> '+convertedCurrentDate);

              if (convertedGameDate > convertedCurrentDate)
              {
                if(games.length > 1)
                {
                  requiredGame = games[i-1];

                  var winningStatement = "";
                  if (requiredGame.isWinner)
                  {
                      winningStatement = "Kings won this match by "+requiredGame.score;
                  }
                  else {
                    winningStatement = "Kings lost this match by "+requiredGame.score;
                  }
                  return res.json({
                      speech: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                      displayText: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                      source: 'game schedule'
                  });
                  break;
                }
                else {
                  return res.json({
                      speech: 'Cant find any previous game played between Kings and '+parameters.team,
                      displayText: 'Cant find any previous game played between Kings and '+parameters.team,
                      source: 'game schedule'
                  });
                }
              }
          }



        }

      });
    }
    else {
      return res.json({
          speech: 'Next game schedules will be available soon',
          displayText: 'Next game schedules will be available soon',
          source: 'game schedule'
      });
    }
  }
  else {
    return res.json({
        speech: 'Cant handle the queries with two teams now. I will update myself',
        displayText: 'Cant handle the queries with two teams now. I will update myself',
        source: 'game schedule'
    });
  }
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
