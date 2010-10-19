var car, cdr, isEq, isArray, isList, isAtom, isNullList, cons, isLat, isMember, rember, firsts, subst, subst2, multiRember, multiInsertR;
isList = isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
};
isNullList = function (list) {
    return isArray(list) && (list.length === 0);
};
isAtom = function (atom) {
    return typeof(atom) === 'string' || typeof(atom) === 'number' ||
        typeof(atom) === 'boolean';
};
car = function (list) {
    if (isArray(list)) {
        return list[0];
    }
};
cdr = function (list) {
    var tail;
    if (isArray(list)) {
        tail = list.slice(1, list.length);
        if (tail.length !== 0) {
            return tail;
        }
        return [];
    }
};
cons = function (inPut, list) {
    if (isArray(list) && inPut !== undefined) {
        return [inPut].concat(list);
    }
};
isEq = function (a, b) {
    return a  === b;
};
isLat = function (list) {
    return isNullList(list) || (isAtom(car(list)) && isLat(cdr(list)));
};
isMember = function (atom, list) {
    if (isAtom(atom) && isList(list)) {
        return isNullList(list) ? false :
            isEq(atom, car(list)) || isMember(atom, cdr(list));
    }
};
rember = function (atom, list) {
    if (isAtom(atom) && isList(list)) {
        return isNullList(list) ? [] :
            isEq(atom, car(list)) ? cdr(list) :
                cons(car(list), rember(atom, cdr(list)));
    }
};
firsts = function (list) {
    if (isList(list)) {
        return isNullList(list) ? [] :
            cons(car(car(list)), firsts(cdr(list)));
    }
};
insertR = function (nu, old, list) {
    if (isAtom(nu) && isAtom(old) && isList(list)) {
        return isNullList(list) ? [] :
            isEq(old, car(list)) ? cons(car(list), cons(nu, cdr(list))) :
                cons(car(list), insertR(nu, old, cdr(list)));
    }
};
insertL = function (nu, old, list) {
    if (isAtom(nu) && isAtom(old) && isList(list)) {
        return isNullList(list) ? [] :
            isEq(old, car(list)) ? cons(nu, list) :
                cons(car(list), insertL(nu, old, cdr(list)));
    }
};
subst = function (nu, old, list) {
    if (isAtom(nu) && isAtom(old) && isList(list)) {
        return isNullList(list) ? [] :
            isEq(old, car(list)) ? cons(nu, cdr(list)) :
                cons(car(list), subst(nu, old, cdr(list)));
    }
};
subst2 = function (nu, o1, o2, list) {
    if (isAtom(nu) && isAtom(o1) && isAtom(o2) && isList(list)) {
        return isNullList(list) ? [] :
            (isEq(o1, car(list)) || isEq(o2, car(list))) ? cons(nu, cdr(list)) :
                cons(car(list), subst2(nu, o1, o2, cdr(list)));
    }
};
multiRember = function (atom, list) {
    if (isAtom(atom) && isList(list)) {
        return isNullList(list) ? [] :
            isEq(atom, car(list)) ? multiRember(atom, cdr(list)) :
                cons(car(list), multiRember(atom, cdr(list)));
    }
};
multiInsertR = function (nu, old, list) {
    if (isAtom(nu) && isAtom(old) && isList(list)) {
        return isNullList(list) ? [] : false;
    }
};
