export function formatDollars(
	input: string | number | null | undefined
): string;
export function formatDollars(
	input: string | number | null | undefined,
	options: { asNumber: true }
): number;
export function formatDollars(
	input: string | number | null | undefined,
	options?: { asNumber?: boolean }
): string | number {
	if (input === null || input === undefined)
		return options?.asNumber ? 0 : "0 $";

	const raw = String(input).trim();

	if (
		raw === "" ||
		raw.toLowerCase() === "nan" ||
		!isFinite(Number(raw.replace(",", ".")))
	) {
		return options?.asNumber ? 0 : "0 $";
	}

	const normalized = raw.replace(",", ".");
	const number = Number(normalized);

	if (isNaN(number)) return options?.asNumber ? 0 : "0 $";

	const rounded = Number(number.toFixed(2));

	if (options?.asNumber) return rounded;

	const formatted = rounded.toFixed(2).replace(".", ",").replace(/,?0+$/, "");

	return `${formatted} $`;
}
