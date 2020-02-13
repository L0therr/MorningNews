export default function(wishList = [], action) {
    if(action.type === 'add') {
        var wishListCopy = [...wishList];
        wishListCopy.push(action.articleLiked);
        return wishListCopy;
    } else if(action.type === 'rmv') {
        var wishListRmv = [...wishList];
        wishListRmv.splice(action.pos, 1);
        return wishListRmv;
    } else {
        return wishList;
    }
  }