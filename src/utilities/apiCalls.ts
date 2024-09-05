export const getData = async (query: string | string[], API_URL: string, isSearch?: boolean) => {
    if (!isSearch) {
        const cachedData = sessionStorage.getItem(query[0]);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    }

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Network error');
        }

        const data = await response.json();

        if (!isSearch) {
            sessionStorage.setItem(query[0], JSON.stringify(data));
        }
        return data;
    } catch (err) {
        return 'Failed to fetch data. Please try again.'
    }
}