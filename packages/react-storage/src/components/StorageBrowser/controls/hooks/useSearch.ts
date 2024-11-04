// import React from 'react';
// import debounce from 'lodash/debounce';
// import { useControlsContext } from '../context';
// import { LocationData } from '../../actions';

// const DEFAULT_DELAY = 300;
// export interface InitialSearchValues {
//   searchTerm?: string;
//   searchKey: keyof LocationData;
//   debounceDelay?: number;
// }

// interface UseSearch {
//   filteredItems: LocationData[];
//   searchTerm: string;
//   handleSearch: (term: string, includeSubfolders: boolean) => void;
// }

// /**
//  * Custom hook to search a list of items based on a search key and search term.
//  * @template T - The type of items in the search list.
//  * @param {UseSearchProps<T>} props
//  * @returns {UseSearch<T>} - The search results, current term, and handler.
//  */
// export function useSearch(): UseSearch | null {
//   const { data } = useControlsContext();

//   const { items, onSearch } = data.search ?? {
//     items: [],
//     onSearch: () => null,
//   };

//   const initialValues = data?.search?.initialValues ?? {
//     searchTerm: '',
//     searchKey: 'prefix',
//     debounceDelay: DEFAULT_DELAY,
//   };

//   const {
//     searchTerm: initialSearchTerm = '',
//     searchKey,
//     debounceDelay = DEFAULT_DELAY,
//   } = initialValues;

//   const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);

//   const filteredItems = items.filter((item) => {
//     const test = item[searchKey];
//     if (typeof test === 'string') {
//       return test.includes(searchTerm);
//     }
//   });

//   const debouncedHandler = debounce(
//     (term: string, includeSubfolders: boolean) => {
//       setSearchTerm(term);
//       if (typeof onSearch === 'function') {
//         onSearch(term, includeSubfolders);
//       }
//     },
//     debounceDelay
//   );

//   // clean up handler on unmount
//   React.useEffect(() => {
//     return () => {
//       debouncedHandler.cancel();
//     };
//   }, [debouncedHandler]);

//   return {
//     searchTerm,
//     filteredItems,
//     handleSearch: debouncedHandler,
//   };
// }
