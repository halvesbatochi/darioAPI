SET SEARCH_PATH TO EV;

DROP TYPE IF EXISTS PEV001001_RESULSET CASCADE;

CREATE TYPE PEV001001_RESULTSET AS (
    CD_ERRO     INTEGER,
    DS_ERRO     VARCHAR(255),
    EV003_IT_ID INTEGER
);

CREATE OR REPLACE FUNCTION PEV001001 (
   /*-----------------------------------------------------------
    Rotina para insert, update e delete de Inscrições nos Eventos
   ------------------------------------------------------------*/
    ENT_NR_VRS       NUMERIC(5)  , /* Stored procedure version */
    ENT_VC_ACTION    CHAR(1),      /* Action:                  */
                                   /*    I - Insert            */
                                   /*    U - Update            */
                                   /*    D - Delete            */
    ENT_IT_ID        INTEGER,      /* ID Inscrição             */
    ENT_IT_EVENTO    INTEGER,      /* ID Evento                */
    ENT_IT_ATIVID    INTEGER,      /* ID Atividade             */
    ENT_IT_VOLUNT    INTEGER       /* ID Voluntário            */
)
    RETURNS SETOF PEV001001_RESULTSET
AS $$

DECLARE
    _R          EV.PEV001001_RESULTSET%Rowtype;
    _CD_ERRO    INTEGER;
    _DS_ERRO    VARCHAR(255);

BEGIN

IF ENT_VC_ACTION = 'I' THEN

    IF EXISTS (SELECT * FROM EV.EV003 WHERE EV003_IT_EVENTO = ENT_IT_EVENTO AND EV003_IT_VOLUNT = ENT_IT_VOLUNT) THEN
        RAISE EXCEPTION 'VOLUNTÁRIO JÁ CADASTRADO NESTE EVENTO';
    END IF;

    INSERT INTO EV.EV003(
        EV003_IT_EVENTO,
        EV003_IT_ATIVID,
        EV003_IT_VOLUNT,
        EV003_IT_SITUAC,
        EV003_DT_ULTATU,
        EV003_DT_INCLUS
    )
    VALUES (ENT_IT_EVENTO,
            ENT_IT_ATIVID,
            ENT_IT_VOLUNT,
            1,
            NOW(),
            NOW());

    _CD_ERRO := 0;
    _DS_ERRO := 'OK';

ELSIF ENT_VC_ACTION = 'U' THEN

    IF ENT_IT_ID IS NULL OR ENT_IT_ID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DA INSCRIÇÃO PARA ATUALIZAÇÃO';
    END IF;

    IF NOT EXISTS (SELECT * FROM EV.EV003 WHERE EV003_IT_ID = ENT_IT_ID) THEN
        RAISE EXCEPTION 'INSCRIÇÃO NÃO LOCALIZADA';
    END IF;

    UPDATE EV.EV003
    SET EV003_IT_ATIVID = ENT_IT_ATIVID,
        EV003_DT_ULTATU = NOW()
    WHERE
        EV003_IT_ID = ENT_IT_ID;

    _CD_ERRO := 0;
    _DS_ERRO := 'OK';
ELSE

    IF ENT_IT_ID IS NULL OR ENT_IT_ID = 0 THEN
        RAISE EXCEPTION 'INFORMAR O CÓDIGO DA INSCRIÇÃO PARA ATUALIZAÇÃO';
    END IF;

    IF NOT EXISTS (SELECT * FROM EV.EV003 WHERE EV003_IT_ID = ENT_IT_ID) THEN
        RAISE EXCEPTION 'INSCRIÇÃO NÃO LOCALIZADA';
    END IF;

    UPDATE
        EV.EV003
    SET
        EV003_IT_SITUAC = 0,
        EV003_DT_ULTATU = NOW()
    WHERE
        EV003_IT_ID = ENT_IT_ID;

    _CD_ERRO := 0;
    _DS_ERRO := 'OK';

END IF;

/*===========================================================================*/
/*= RESULT SET                                                              =*/
/*===========================================================================*/
FOR _R IN
  SELECT
    _CD_ERRO,
    _DS_ERRO,
    (SELECT
         EV003_IT_ID
     FROM
         EV.EV003
     WHERE EV003_IT_EVENTO = ENT_IT_EVENTO
       AND EV003_IT_VOLUNT = ENT_IT_VOLUNT
     ORDER BY EV003_DT_ULTATU DESC LIMIT 1)
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
