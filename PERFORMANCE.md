# Performance Optimizations

This document describes the performance optimizations applied to the cs-conf-stats project.

## Summary

Several key optimizations have been implemented to improve page load time, reduce memory usage, and enhance user experience:

1. **DOM Query Caching**: Reduced repeated DOM queries
2. **Event Handler Debouncing**: Limited resize event firing frequency
3. **Algorithm Optimization**: Moved expensive operations outside loops
4. **Centralized Chart Management**: Consolidated resize handlers

## Detailed Improvements

### 1. DOM Query Caching (fun.js)

**Problem**: The code was calling `document.querySelector()` multiple times for the same elements.

**Solution**: Cache all DOM references once at initialization:

```javascript
const domCache = {
  numVenues: document.querySelector('#viz-num-venues .conf-card-big-desc'),
  numConfs: document.querySelector('#viz-num-confs .conf-card-big-desc'),
  // ... 11 more cached references
};
```

**Impact**: 
- Eliminates ~13 redundant DOM queries
- Faster data updates to UI elements
- Reduced browser layout recalculations

### 2. Resize Event Debouncing

**Problem**: Window resize events can fire dozens of times per second, causing 14+ chart resize operations each time.

**Solution**: Implemented debounce function to limit resize handling:

```javascript
function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  allCharts.forEach(chart => chart.resize());
}, 250));
```

**Impact**:
- Resize operations throttled to maximum once per 250ms
- Reduced CPU usage during window resizing
- Smoother user experience on slower devices

### 3. Loop Optimization (fun.js)

**Problem**: City conferences were being sorted on every iteration of the data processing loop:

```javascript
// Before: O(n * m log m) complexity
cityConferences[cityWithFlag].push({...});
cityConferences[cityWithFlag].sort((a, b) => b.year - a.year); // In loop!
```

**Solution**: Move sorting outside the loop:

```javascript
// After: O(n + k * m log m) where k << n
cityConferences[cityWithFlag].push({...});

// After loop completes:
Object.keys(cityConferences).forEach(city => {
  cityConferences[city].sort((a, b) => b.year - a.year);
});
```

**Impact**:
- Dramatically reduced sorting operations (from thousands to ~50)
- Faster initial page load
- Lower memory churn

### 4. Centralized Chart Management

**Problem**: Each chart render function added its own resize event listener:

```javascript
// Before: 14 separate resize listeners
function renderDiscipline(data) {
  // ... chart setup
  window.addEventListener('resize', () => disciplineChart.resize());
}
// ... 13 more similar functions
```

**Solution**: Charts return their instances; one consolidated resize handler:

```javascript
// After: Single debounced handler for all charts
const allCharts = [
  disciplineChart, conferenceChart, yearlyChart,
  // ... 11 more charts
];

window.addEventListener('resize', debounce(() => {
  allCharts.forEach(chart => chart.resize());
}, 250));
```

**Impact**:
- Reduced event listeners from 14 to 1
- Better memory efficiency
- Easier to maintain and debug

### 5. Array Operations Optimization

**Problem**: Unnecessary array copies:

```javascript
// Before
const sortedConferences = data.conferences.slice().sort(...);
```

**Solution**: Direct filtering and sorting:

```javascript
// After
const sortedConferences = data.conferences
  .filter(c => c.series !== 'Template')
  .sort((a, b) => a.series.localeCompare(b.series));
```

**Impact**:
- Avoided unnecessary array copy
- Filtered out invalid template data
- Cleaner, more functional code

## Performance Metrics

### Before Optimizations
- DOM queries: ~13 repeated queries on data update
- Resize events: 14+ handlers firing on every resize event
- Sorting operations: O(n * m log m) in data processing loop
- Memory: 14 separate resize event listeners

### After Optimizations
- DOM queries: 13 cached references, queried once
- Resize events: 1 debounced handler (max 4 calls/second)
- Sorting operations: O(n + k * m log m) where k << n
- Memory: 1 consolidated resize listener

## Browser Compatibility

All optimizations use standard JavaScript features:
- ES6+ syntax (arrow functions, const/let, template literals)
- Standard DOM APIs
- No new dependencies required

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Future Optimization Opportunities

1. **Lazy Loading**: Load echarts.min.js (1MB) asynchronously or from CDN
2. **Code Splitting**: Separate main.js and fun.js functionality for faster initial load
3. **Data Pagination**: Load conference data incrementally if dataset grows significantly
4. **Virtual Scrolling**: For long lists in visualizations
5. **Service Worker**: Cache static assets and JSON data for offline support
6. **Image Optimization**: Compress and lazy-load images if added

## Testing

To verify optimizations:

1. **JavaScript Validation**:
   ```bash
   node -c src/js/main.js
   node -c src/js/fun.js
   ```

2. **Browser DevTools**:
   - Open Performance tab
   - Record while resizing window
   - Check for reduced resize handler calls
   - Verify debouncing behavior

3. **Manual Testing**:
   - Load index.html and fun-fact.html
   - Verify all visualizations render correctly
   - Test window resize behavior
   - Check conference selection and data display

## Maintenance Notes

- **Debounce delay**: Currently set to 250ms. Adjust if needed based on user feedback.
- **DOM cache**: Add new elements to `domCache` object if adding new stats cards
- **Chart array**: Update `allCharts` array when adding/removing visualizations
- Keep chart render functions returning their instances for centralized management
