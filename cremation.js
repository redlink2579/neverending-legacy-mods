G.AddData({
	name:'Cremation',
	author:'Owen "Ohead" Parker',
	desc:'Adds the cremation option for firekeepers once iron is unlocked',
	engineVersion:1,
	requires:['Default dataset*'],
	func:function()
	{
		
		G.getDict('firekeeper').modes['cremate'] = {
			name:'Cremate corpses',
			icon:[8,3],
			desc:'Clear out [corpse]s faster than they can be buried.'
		};/*
		G.getDict('firekeeper')['effects'].push({
			type:'convert',
			from:{'corpse':10,'fire pit':0.01},
			into:{},
			every:1,
			repeat:10,
			mode:'cremate'
		});
		*/
	}
});