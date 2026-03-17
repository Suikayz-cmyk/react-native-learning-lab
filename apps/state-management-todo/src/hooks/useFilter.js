// src/hooks/useFilter.js

import { useState, useCallback } from 'react';

// Enum-like object → jadi single source of truth untuk filter value
export const FILTERS = {
 ALL: 'all',
 ACTIVE: 'active',
 COMPLETED: 'completed',
};

export const useFilter = (initialFilter = FILTERS.ALL) => {
 // Local state → karena filter itu UI concern, bukan global data utama
 const [activeFilter, setActiveFilter] = useState(initialFilter);

 const setFilter = useCallback((filter) => {

    // Guard clause → validasi input sebelum update state
    if (Object.values(FILTERS).includes(filter)) {
        setActiveFilter(filter);
    }
 }, []);

 return { activeFilter, setFilter, FILTERS };
};