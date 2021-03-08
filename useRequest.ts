import { useSWRInfinite } from "swr";

export const FETCHER = (url: string) => fetch(url).then(res => res.json());

export function usePaginatePhotos(url: string) {
    const PAGE_LIMIT = 25;

    const { data, error, size, setSize } = useSWRInfinite(
        index => `${url}&page=${index+1}`,
        FETCHER
    );

    const photos = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.photos.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.photos.length < PAGE_LIMIT);

    return { photos, error, isLoadingMore, size, setSize, isReachingEnd, isEmpty };
}
