SET SEARCH_PATH TO EV;

DROP TYPE IF EXISTS PEV001002_RESULTSET CASCADE;

CREATE TYPE PEV001002_RESULTSET AS (
    CD_ERRO     INTEGER,
    DS_ERRO     VARCHAR(255)
);

CREATE OR REPLACE FUNCTION PEV001002 (
   /*-----------------------------------------------------------
    Rotina para calculo da matriz de similaridade dos cossenos
   ------------------------------------------------------------*/
    ENT_NR_VRS       NUMERIC(5)  , /* Stored procedure version */
    ENT_IT_ID        INTEGER       /* ID Voluntário            */
)
    RETURNS SETOF PEV001002_RESULTSET
AS $$

DECLARE
    _R        EV.PEV001002_RESULTSET%Rowtype;
    _CD_ERRO  INTEGER;
    _DS_ERRO  VARCHAR(255);

    _ATUAC    INTEGER;
    
BEGIN

    _ATUAC := SELECT 
                EV006_IT_ATUAC 
              FROM (

                SELECT 
                 EV006_IT_ATUAC,
                 COUNT(EV006_IT_ATUAC) AS CNT 
               FROM 
                 EV.EV006 
                WHERE 
                 EV006_IT_VOLUNT = ENT_IT_ID
                GROUP BY EV006_IT_ATUAC 
                ORDER BY CNT DESC LIMIT 1) T;

/*===========================================================================*/
/*= RESULT SET                                                              =*/
/*===========================================================================*/
FOR _R IN
  SELECT
    _ATUAC;
    'OK',
  LOOP
    RETURN NEXT _R;
  END LOOP;
  
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  /*::                      EXCEPTION HANDLING POSTGRES                    ::*/
  /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
EXCEPTION WHEN OTHERS THEN
  _DS_ERRO   := SQLERRM;
  _CD_ERRO   := -1;
  FOR _R IN
    SELECT
      _CD_ERRO,
      _DS_ERRO
    LOOP
      RETURN NEXT _R;
  END LOOP;
  RETURN;
END
$$ LANGUAGE PLPGSQL;
