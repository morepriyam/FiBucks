import {
	CreditCard,
	Landmark,
	TrendingUp,
	Banknote,
	Home,
	Package,
} from "lucide-react";

export const getIcon = (fieldName: string) => {
	switch (fieldName) {
		case "creditCards":
			return <CreditCard className="h-5 w-5" />;
		case "depositoryAccounts":
			return <Landmark className="h-5 w-5" />;
		case "investments":
			return <TrendingUp className="h-5 w-5" />;
		case "loans":
			return <Banknote className="h-5 w-5" />;
		case "realEstate":
			return <Home className="h-5 w-5" />;
		case "others":
			return <Package className="h-5 w-5" />;
		default:
			return null;
	}
};

export const getSummary = (fieldName: string, field: any) => {
	switch (fieldName) {
		case "creditCards":
			return `${field.name} (*${field.lastFourDigits})`;
		case "depositoryAccounts":
			return `${field.name}: $${field.balance}`;
		case "investments":
			return `${field.name}: $${field.value}`;
		case "loans":
			return `${field.name}: $${field.balance} @ ${field.interestRate}%`;
		case "realEstate":
			return `${field.address}: $${field.value}`;
		case "others":
		default:
			return `${field.name}: $${field.value}`;
	}
};
