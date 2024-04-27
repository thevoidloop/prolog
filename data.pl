progenitor(ernestina,mery).
progenitor(ernestina,napoleon).
progenitor(mery,melissa).
progenitor(mery,jeancarlo).
progenitor(veliz,melissa).
progenitor(veliz,jeancarlo).
progenitor(melissa,adriana).
progenitor(juan,mery).
progenitor(juan,napoleon).
progenitor(napoleon,ingrid).
progenitor(napoleon,junior).
progenitor(maritza,ingrid).
progenitor(maritza,junior).
progenitor(ingrid,enzo).

hombre(juan).
hombre(veliz).
hombre(napoleon).
hombre(jeancarlo).
hombre(junior).
hombre(enzo).
mujer(ernestina).
mujer(mery).
mujer(maritza).
mujer(melissa).
mujer(ingrid).
mujer(adriana).

padre(X, Y) :-
progenitor(X, Y),
hombre(X).

madre(X,Y) :-
progenitor(X,Y),
mujer(X).

hijo(X,Y) :-
progenitor(Y,X),
hombre(X).

hija(X,Y) :-
progenitor(Y,X),
mujer(X).

abuelo(X,Y) :-
progenitor(X,Z),
progenitor(Z,Y),
hombre(X).

abuela(X,Y) :-
progenitor(X,Z),
progenitor(Z,Y),
mujer(X).

nieto(X,Y) :-
progenitor(Z,X),
progenitor(Y,Z),
hombre(X).

nieta(X,Y) :-
progenitor(Z,X),
progenitor(Y,Z),
mujer(X).

bisabuelo(X,Y) :-
progenitor(X,Z),
progenitor(Z,W),
progenitor(W,Y),
hombre(X).

bisabuela(X,Y) :-
progenitor(X,Z),
progenitor(Z,W),
progenitor(W,Y),
mujer(X).