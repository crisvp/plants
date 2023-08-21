export interface UnsplashApiResponse {
  results: UnsplashApiResult[];
}

export interface UnsplashApiResult {
  urls: {
    regular: string;
  };

  user: {
    name: string;
    portfolio_url?: string;
    links: {
      html: string;
    };
  };
}

export interface UnsplashImage {
  url: string;
  profile: string;
  name: string;
}

export const defaultBackground: UnsplashImage = {
  url: import.meta.env.VITE_UNSPLASH_DEFAULT_URL as string,
  name: import.meta.env.VITE_UNSPLASH_DEFAULT_NAME as string,
  profile: import.meta.env.VITE_UNSPLASH_DEFAULT_PROFILE as string,
};

export async function getUnsplash(query: string): Promise<UnsplashImage> {
  if (!import.meta.env.VITE_UNSPLASH_CLIENT_ID) throw new Error('No Unsplash client ID set');

  const result = await fetch(
    'https://api.unsplash.com/search/photos?' +
      new URLSearchParams({
        client_id: import.meta.env.VITE_UNSPLASH_CLIENT_ID as string,
        query,
      }).toString(),
    {
      method: 'GET',
      mode: 'cors',
    },
  );
  if (!result.ok) throw new Error('Failed to fetch image');
  if (!result.body) throw new Error('No response body');

  const reader = result.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const { value: chunk, done } = await reader.read();
  if (done) throw new Error('No response body');

  const data = JSON.parse(decoder.decode(chunk)) as UnsplashApiResponse;
  const idx = Math.floor(Math.random() * data.results.length);

  return {
    url: data.results[idx].urls.regular,
    name: data.results[idx].user.name,
    profile: data.results[idx].user.links.html,
  };
}
