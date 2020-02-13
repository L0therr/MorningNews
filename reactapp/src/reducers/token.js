export default function(token = '', action) {
    if(action.type === 'addToken') {
        return action.currentToken;
    } else if(action.type === 'rmvToken') {
        return '';
    } else {
        return '';
    }
  }