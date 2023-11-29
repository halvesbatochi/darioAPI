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
    ENT_IT_ID        INTEGER     , /* ID Voluntário            */
)
    RETURNS SETOF PEV001002_RESULTSET
AS $$

DECLARE
    _R        EV.PEV001002_RESULTSET%Rowtype;
    _CD_ERRO  INTEGER;
    _DS_ERRO  VARCHAR(255);
    
BEGIN



/*===========================================================================*/
/*= RESULT SET                                                              =*/
/*===========================================================================*/
FOR _R IN
  SELECT
    0,
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
