//Javascript for the results page
function SetEndGameScores(savestats)
{
    if (savestats != false) {
        SaveRound();
    }

	//Grab the player names
	var name1 = playerNames[0];
    var name2 = playerNames[1];
    var name3 = playerNames[2];
    var name4 = playerNames[3];    
	
	var value1 = 0;
	var value2 = 0;
	var value3 = 0;
	var value4 = 0;	
	
	var status = new Array();

    value1 = playerTotals[0];
    value2 = playerTotals[1];
    value3 = playerTotals[2];
    value4 = playerTotals[3];    

    if (name1) { status.push({ name: name1, val: value1 }); }
    if (name2) { status.push({ name: name2, val: value2 }); }
    if (name3) { status.push({ name: name3, val: value3 }); }
    if (name4) { status.push({ name: name4, val: value4 }); }    
    
	//Sort the status array which will be used to display the final scores
	status.sort(function(a,b) {
		return a.val - b.val;
	});
	
	//Set the final scores in the results page
	for (i = 0; i < status.length; i++)
	{ 
		var name = status[i]['name'];
		var value = status[i]['val'];
		
		var currentName = 'name' + (i+1).toString();
		var currentScore = 'score' + (i+1).toString();
		
		document.getElementById(currentName).innerText = name;
		document.getElementById(currentScore).innerText = value;
	}	
	
    //make sure all are visible
	for (i = 0; i < 4; i++) {
	    var rowId = 'row' + (i + 1).toString();
	    var row = document.getElementById(rowId);
	    row.style.display = 'table-row'	    
	}

    //hide the ones not used
	for (i = status.length; i < 4; i++)
	{
		var rowId = 'row' + (i+1).toString();				
		var row = document.getElementById(rowId);
        row.style.display = 'none'	
	}	
}