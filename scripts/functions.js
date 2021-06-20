function myIndexOf(arr, o) {    //you can't find objects in objects to be equal, so here's a custom function from the web to do that!
    for (var i = 0; i < arr.length; i++) {

        if (arr[i][0] == o[0] && arr[i][1] == o[1]) {
            return i;
        }
    }
    return -1;
}