INSERT INTO TBL_USER (INT_USER, VCH_NAME, ENM_GENERO, VCH_CORREO, VCH_PASS, ENM_PERMISOS, ENM_STATUS) VALUES (NULL, "AIME", "Femenino", "a@gmail.com", "123", "ADMIN", "ACTIVO");
INSERT INTO TBL_USER (INT_USER, VCH_NAME, ENM_GENERO, VCH_CORREO, VCH_PASS, ENM_PERMISOS, ENM_STATUS) VALUES (NULL, "ARTURO", "Masculino", "b@gmail.com", "321", "USER", "ACTIVO");

UPDATE TBL_USER SET ENM_STATUS = "ACTIVO" WHERE ENM_STATUS = "INACTIVO"

UPDATE TABLA SET CAMPO = NUEVO_VALOR WHERE CAMPO = VALOR_ACTUALS