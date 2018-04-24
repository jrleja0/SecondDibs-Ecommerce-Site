const basicFlatButton = {
  color: 'white',
  border: '2px solid #c2a661',
  height: '50px',
  cursor: 'pointer',
};
const flatButtonNoBorder =
  Object.assign({},
    basicFlatButton,
    {border: '2px solid transparent'},
  );

const basicTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  color: '#222',
};

export const stylesMainNavContainer = {
  toolbar: {
    backgroundColor: '#222',
    borderBottom: '2px solid #c2a661',
    height: '65px',
    padding: null,
  },
  flatButton: basicFlatButton,
  flatButtonNoBorder: flatButtonNoBorder,
  navMenuIconButton:
    Object.assign({},
      basicFlatButton,
      {
        border: '2px solid transparent',
        margin: null,
      }
    ),
  navMenuIcon: {
    fill: 'white',
    width: '48px',
    height: '48px',
    margin: 0,
  },
  loggedInAccountIcon: {
    fill: null,
    width: '42px',
    height: '42px',
    margin: 0,
  },
  drawerMenuContainer: {
    backgroundColor: '#222',
    color: '#c2a661',
  },
  menuItem: {
    color: null,
    paddingLeft: '20px',
  },
  divider: {
    backgroundColor: '#c2a661',
  }
};

export const stylesAuthForm = {
  errorVisible: {
    visibility: 'visible',
  },
  errorHidden: {
    visibility: 'hidden',
  },
  authFormTitle: {
    backgroundColor: '#222',
    color: 'white',
  },
  authFormBody: {
    backgroundColor: '#f6f3eb',
  },
  authFormActionsContainer: {
    backgroundColor: '#222',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  flatButton:
    Object.assign({},
      basicFlatButton,
      {width: '200px'}
    ),
  flatButtonNoBorder: flatButtonNoBorder,
};

export const stylesBrowseContainer = {
  toolbar: {
    backgroundColor: '#222',
    border: '2px solid #c2a661',
    height: '75px',
    padding: 0,
    marginBottom: '20px',
  },
  flatButton: {
    color: 'white',
    height: '75px',
    width: '100%',
  },
};

export const stylesBrowse = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  loadMoreButton: {
    color: '#c2a661',
    border: '4px solid #c2a661',
    borderRadius: 20,
    height: 60,
    width: 200,
    margin: '20px auto',
  },
  loadMoreButtonDisabled: {
    color: 'rgba(0, 0, 0, 0.4)',
    border: '4px solid rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    height: 60,
    width: 200,
    margin: '20px auto',
    cursor: 'default',
  }
};

export const stylesBrowseFavorites = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
};

export const stylesBrowseSearch = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
  browseSearchInput: {
    margin: 'auto',
    border: '4px solid #c2a661',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
  },
  browseIcon: {
    color: '#222',
    left: '-5px',
    bottom: '-5px',
    position: 'relative',
  },
};

export const stylesItem = {
  flatButton: {
    color: null,
    background: null,
    backgroundColor: null,
    border: null,
    height: null,
    cursor: null,
  },
  navbarChevronLeft: {
    width: '48px',
    height: '48px',
    margin: 0,
  },
  backButton: {
    color: '#c2a661',
    textDecoration: 'underline',
    height: '90%',
    minWidth: null,
  },
  backButtonLabel: {
    fontSize: '18px',
    padding: 0,
  },
  titleStyle: basicTitleStyle,
};

export const stylesItemsGrid = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
  },
};

export const stylesCart = {
  flatButton: basicFlatButton,
  flatButtonNoBorder: flatButtonNoBorder,
  flatButtonNoBorderEmptyCart:
    Object.assign({},
      flatButtonNoBorder,
      {
        color: '#222',
        position: 'relative',
        top: '-10px',
      }
    ),
  checkoutButtonDisabled:
    Object.assign({},
      basicFlatButton,
      {
        color: 'rgba(0, 0, 0, 0.4)',
        border: '4px solid rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        cursor: 'default',
      }
    ),
  emptyCartButtonDisabled:
    Object.assign({},
      flatButtonNoBorder,
      {
        color: 'rgba(0, 0, 0, 0.4)',
        position: 'relative',
        top: '-10px',
        cursor: 'default',
      }
    ),
  toolbar: {
    backgroundColor: '#222',
    borderTop: '2px solid #c2a661',
    height: '65px',
  },
  titleStyle: basicTitleStyle,
  imageColumn: {
    textAlign: 'center',
    width: null,
    padding: null,
  },
  itemNameColumn: {
    whiteSpace: 'normal',
    padding: null,
  },
  itemPriceColumn: {
    width: null,
    padding: null,
  },
  removeItemColumn: {
    width: null,
    padding: null,
  },
};
