export interface Coupon {
	'coupon_id': number;
	'description': string;
	'amount': number;
	'name': string;
	'is_favouirite': boolean;
	'is_available': boolean;
	'delivery': boolean;
	'eat_in_local': boolean;
	'pick_up_local': boolean;
	'favourite_count': number;
	'tags': Tags[];
	'available_hours': OpenHours[];
}

export interface Tags {
	'id': number;
	'name': string;
	'is_main': boolean;
}

export interface OpenHours {
	'id_day': number;
	'hour_from': string;
	'hour_to': string;
}