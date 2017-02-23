var SeatReservation = {};
SeatReservation.controller = (function()
{
	SeatReservation.vm.init();
	m.redraw.strategy("diff");
	return{
		// event deligation. attached event to tbody instead of each table cell
	  	selectSeat :  function(e){
	  		var seatNo = parseInt(e.target.getAttribute('data-seat-no'));
	  		if(seatNo && SeatReservation.vm.available().indexOf(seatNo) != -1)
	  		{
	  			//  if the seat is already selected then de-select it or select it
		  		var index = SeatReservation.vm.selected().indexOf(seatNo);
		  		if(index != -1)
		  		{
		  			SeatReservation.vm.selected().splice(index,1);
		  		}
		  		else
		  		   SeatReservation.vm.selected().push(seatNo);
		  	}
	  	}
	}
});
SeatReservation.vm = {
	init: function(){   
		// Model Data - Can be replaced with ajax response
		// sample data hardcoded
   		SeatReservation.vm.available = m.prop([2,4,5,7,14,19,20,21,23,24,25,28,31,35,36,40,44,46,47]);
   		SeatReservation.vm.selected = m.prop([]);
   		SeatReservation.vm.totalSeats = m.prop(48);
   		SeatReservation.vm.cols = m.prop(12);
   		SeatReservation.vm.rows = m.prop(SeatReservation.vm.totalSeats()%SeatReservation.vm.cols());
   		SeatReservation.vm.seats = m.prop(SeatReservation.arrangeSeats());
	}
};

// Helper that coverst the no of seats to 2D array
SeatReservation.arrangeSeats = function(){
	var seats = [];
	var row = [];
	for(var i=1;i<=SeatReservation.vm.totalSeats();i++)
	{
		if(i == ((i%SeatReservation.vm.cols())+1))
			row = [];
		row.push(i);
		if((i%SeatReservation.vm.cols()) == 0)
		{
			seats.push(row);
			row = [];
		}
	}
	return seats;
}
SeatReservation.view =  function(ctrl)
{
	return[
		m("table.seat__info",[
			m("tbody",[
				m("tr",[
					m("td.seat__info__row",[
						m("span.seat__info__available__box"),
						m("span",'Available')
					]),
					m("td.seat__info__row",[
						m("span.seat__info__filled__box"),
						m("span",'Filled')
					]),
					m("td.seat__info__row",[
						m("span.seat__info__selected__box"),
						m("span",'Selected')
					])
				])
			])
		]),
		m("table",[
			m("tbody",{onclick:ctrl.selectSeat/*event delaged to parent*/},[
				SeatReservation.vm.seats().map(function(row){
					return[
						m("tr",[
							row.map(function(col){
								return[
									 m("td.rows",{class:SeatReservation.setStatusClass(col),'data-seat-no':col})
								]
							})
						])
						]
				}),
				m("tr",[
					m("td",{colspan:SeatReservation.vm.cols()},'You reserved '+ SeatReservation.vm.selected().length +' seat(s) '+ (SeatReservation.vm.selected().length > 0 ? 'and the seat numbers are: '+SeatReservation.vm.selected().join(",") : ''))
				])
			]),

		]),
	 	]
}

SeatReservation.setStatusClass = function(val){
	if(SeatReservation.vm.selected().indexOf(val) != -1)
		return 'selected';
	else if(SeatReservation.isAvailable(val))
		return 'available';
	else
		return '';
}	

SeatReservation.isAvailable = function(val){
	return (SeatReservation.vm.available().indexOf(val) != -1)
}
module.exports = {
   view : SeatReservation.view,
   controller : SeatReservation.controller
}
