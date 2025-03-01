import type { PageServerLoad } from './$types';
import path from 'node:path';
import fs from 'node:fs/promises';
import type { PairsData } from '$lib';

export const load: PageServerLoad = async () => {
	const dataJsonPath = path.join(process.cwd(), 'src', 'data.json');
	const dataJsonData = await fs.readFile(dataJsonPath);
	const dataJson = JSON.parse(dataJsonData.toString()) as PairsData;

	return { ...dataJson };
};
