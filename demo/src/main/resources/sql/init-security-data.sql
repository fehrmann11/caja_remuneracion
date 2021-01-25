/*
-- Query: SELECT * FROM mydb.usuario_has_rol
LIMIT 0, 1000

-- Date: 2021-01-25 09:19
-- Password sin cifrado para todos los usuarios: welcome1
*/
INSERT INTO `` (`idusuario`,`rut_usuario`,`password`) VALUES (1,'111111111','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK');
INSERT INTO `` (`idusuario`,`rut_usuario`,`password`) VALUES (2,'222222222','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK');
INSERT INTO `` (`idusuario`,`rut_usuario`,`password`) VALUES (3,'333333333','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK');
INSERT INTO `` (`idusuario`,`rut_usuario`,`password`) VALUES (4,'444444444','$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK');

INSERT INTO `` (`idrol`,`rol`) VALUES (1,'ADMIN');
INSERT INTO `` (`idrol`,`rol`) VALUES (2,'BACKOFFICE');
INSERT INTO `` (`idrol`,`rol`) VALUES (3,'NEGOCIO');
INSERT INTO `` (`idrol`,`rol`) VALUES (4,'EXTERNO');

INSERT INTO `` (`usuario_idusuario`,`rol_idrol`) VALUES (1,1);
INSERT INTO `` (`usuario_idusuario`,`rol_idrol`) VALUES (2,2);
INSERT INTO `` (`usuario_idusuario`,`rol_idrol`) VALUES (3,3);
INSERT INTO `` (`usuario_idusuario`,`rol_idrol`) VALUES (4,4);
