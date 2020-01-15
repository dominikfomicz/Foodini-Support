export interface Coupon {
	'amount': number;
	'available_hours': OpenHours[];
	'delivery': boolean;
	'description': string;
	'eat_in_local': boolean;
	'id_coupon_data_main': number;
	'id_local_data_main': number;
	'mature': boolean;
	'name': string;
	'pick_up_local': boolean;
	'tags': Tags[];
}

export interface Tags {
	'id': number;
	'name': string;
	'is_main': boolean;
}

export interface OpenHours {
	'id_week_day': number;
	'hour_from': string;
	'hour_to': string;
}