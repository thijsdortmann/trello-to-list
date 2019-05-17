/*

Trello-to-List bookmarklet

The code below is used in the bookmarklet version of this tool. You can visit https://thijsdortmann.nl/trello-to-list/ for a draggable bookmarklet.

(c) 2019 Thijs Dortmann

*/

if(location.href.startsWith('https://trello.com/b/')) {
	let boardId = /https:\/\/trello.com\/b\/(\w+)\/\w+/.exec(location.href)[1];

	fetch('https://trello.com/b/' + boardId + '.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		const listTab = window.open('').document;

		const lists = {};

		data.lists.forEach(function(l) {
			lists[l.id] = {
				'name' : l.name,
				'cards' : []
			};
		});

		data.cards.forEach(function(c) {
			if(!c.closed) {
				lists[c.idList].cards.push({
					'name' : c.name
				});
			}
		});

		let output = "";

		for (var key in lists) {
			if (lists.hasOwnProperty(key)) {
				var l = lists[key];

				listTab.write("<h1>" + l.name + "</h1><ul>");
				l.cards.forEach(function(c) {
					listTab.write("<li>" + c.name + "</li>");
				});
				listTab.write("</ul>");
			}
		}
	});
} else {
	alert("Please visit the Trello board you want to convert to a copyable HTML-list before clicking this bookmark.")
}
