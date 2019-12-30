export interface Restaurant {
	name: string;
	address: string;
	id_city_const_type: number;
	phone_number: number;
	description: string;
	other_info: string;
	facebook_url: string;
	instagram_url: string;
	delivery: boolean;
	eat_in_local: boolean;
	pick_up_local: boolean;
	cash_payment: boolean;
	creditcards_payment: boolean;
	contactless_payment: boolean;
	blik_payment: boolean;
}