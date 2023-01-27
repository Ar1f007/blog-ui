import { Search, SearchIconWrapper, StyledInputBase } from '../../components/ui/Search';
import Icons from '../../utils/icons';

const SearchBar = () => (
  <Search>
    <SearchIconWrapper>
      <Icons.Search />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </Search>
);

export default SearchBar;
