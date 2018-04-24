import React from 'react';
import history from '../history';
import FlatButton from 'material-ui/FlatButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import {stylesItem as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
const BackToBrowseButton = () => {

  const handleBackToBrowseButton = () => {
    switch (history.previousPathname) {
      case '/browse/favorites':
        history.push('/browse/favorites');
        break;
      case '/browse/search':
        history.push('/browse/search');
        break;
      default:
        history.push('/browse');
    }
  };

  return (
    <div>
      <div className="button-back-to-browse-large">
        <FlatButton
          className="button-back-to-browse"
          label="Browse"
          icon={
            <NavigationChevronLeft
              style={styles.navbarChevronLeft}
            />
          }
          style={styles.backButton}
          labelStyle={styles.backButtonLabel}
          hoverColor="#c2a661"
          rippleColor="yellow"
          onClick={handleBackToBrowseButton}
        />
      </div>
      <div className="button-back-to-browse-small">
        <FlatButton
          className="button-back-to-browse"
          icon={
            <NavigationChevronLeft
              style={styles.navbarChevronLeft}
            />
          }
          style={styles.backButton}
          hoverColor="#c2a661"
          rippleColor="yellow"
          onClick={handleBackToBrowseButton}
        />
      </div>
    </div>
  );
};

export default BackToBrowseButton;
