export default function(CurrentLanguage = 'en', action) {
    if(action.type === 'change') {
        return action.toChange;
    } else {
        return 'en';
    }
  }