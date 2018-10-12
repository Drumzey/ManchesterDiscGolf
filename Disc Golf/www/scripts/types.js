var Round = (function () {
    this.Holes = [];
    this.FullRound = false;
    this.Scores = [];
    this.CourseType = '';    
    this.Total = [];
    this.Date = '';
});

var Friend = (function () {
    this.name = '';
    this.email = '';
    this.abbrev = '';
});

var TemporaryGame = (function () {
    this.playerNames = [];
    this.currentGameType = [];
    this.currentCourseType = [];
    this.holesPlayed = [];
    this.playerScores = [];     
});