SET SEARCH_PATH TO EV;


DROP TYPE IF EXISTS PEV001002_RESULTSET CASCADE;

CREATE TYPE PEV001002_RESULTSET AS (
      AD001_VC_NFANTA VARCHAR,
      AD001_VC_LOGO   VARCHAR,
      AD001_IT_ATUAC  INTEGER,
      AD003_VC_DESC   VARCHAR,
      EV001_VC_ATV1   VARCHAR,
      EV001_VC_ATV2   VARCHAR,
      EV001_VC_ATV3   VARCHAR,
      EV001_IT_ID     INTEGER,
      EV001_IT_INST   INTEGER,
      EV001_VC_END    VARCHAR,
      EV001_IT_NUM    NUMERIC,
      EV001_VC_COMPL  VARCHAR,
      EV001_VC_BAIRRO VARCHAR,
      EV001_VC_CIDADE VARCHAR,
      EV001_VC_ESTADO VARCHAR,
      EV001_VC_PAIS   VARCHAR,
      EV001_VC_TITULO VARCHAR,
      EV001_DT_INIC   NUMERIC(8,0),
      EV001_HR_INIC   NUMERIC(4,0),
      EV001_DT_FIM    NUMERIC(8,0),
      EV001_HR_FIM    NUMERIC(4,0),
      EV001_IT_NPART  NUMERIC,
      EV001_VC_FMSG1  VARCHAR,
      EV001_VC_FMSG2  VARCHAR,
      EV001_VC_FMSG3  VARCHAR,
      EV001_VC_FMSG4  VARCHAR,
      EV001_VC_FMSG5  VARCHAR,
      EV001_VC_PMSG1  VARCHAR,
      EV001_VC_PMSG2  VARCHAR,
      EV001_VC_IMG1   VARCHAR,
      EV001_VC_IMG2   VARCHAR,
      EV001_IT_ATV1   INTEGER,
      EV001_IT_ATV2   INTEGER,
      EV001_IT_ATV3   INTEGER,
      EV001_IT_SITUAC NUMERIC(2,0),
      EV001_DT_ULTATU TIMESTAMP,
      EV001_DT_INCLUS TIMESTAMP
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
    _ATIV1    INTEGER;
    _ATIV2    INTEGER;
    _ATIV3    INTEGER;
    _VECTOR   public.VECTOR(3);
    _OCCUR    INTEGER;
    _PREFER   INTEGER;

BEGIN

    CREATE TEMP TABLE EVENTS (
      ID             BIGSERIAL PRIMARY KEY,
      INST           INTEGER,
      EVENTO         INTEGER,
      VECTOR         public.VECTOR(3),
      ATUAC          INTEGER,
      ATV1           INTEGER,
      ATV2           INTEGER,
      ATV3           INTEGER
    );

    CREATE TEMP TABLE SIMILARIDADE (
      ID             INTEGER,
      INST           INTEGER,
      NFANTA         VARCHAR,
      EVENTO         INTEGER,
      NEVENTO        VARCHAR,
      VECTOR         public.VECTOR(3),
      SIMILARITY     FLOAT,
      TEXTOSIMILAR   FLOAT
    );

    CREATE TEMP TABLE EVENTOSFINAIS (
      AD001_VC_NFANTA VARCHAR,
      AD001_VC_LOGO   VARCHAR,
      AD001_IT_ATUAC  INTEGER,
      AD003_VC_DESC   VARCHAR,
      EV001_VC_ATV1   VARCHAR,
      EV001_VC_ATV2   VARCHAR,
      EV001_VC_ATV3   VARCHAR,
      EV001_IT_ID     INTEGER,
      EV001_IT_INST   INTEGER,
      EV001_VC_END    VARCHAR,
      EV001_IT_NUM    NUMERIC,
      EV001_VC_COMPL  VARCHAR,
      EV001_VC_BAIRRO VARCHAR,
      EV001_VC_CIDADE VARCHAR,
      EV001_VC_ESTADO VARCHAR,
      EV001_VC_PAIS   VARCHAR,
      EV001_VC_TITULO VARCHAR,
      EV001_DT_INIC   NUMERIC(8,0),
      EV001_HR_INIC   NUMERIC(4,0),
      EV001_DT_FIM    NUMERIC(8,0),
      EV001_HR_FIM    NUMERIC(4,0),
      EV001_IT_NPART  NUMERIC,
      EV001_VC_FMSG1  VARCHAR,
      EV001_VC_FMSG2  VARCHAR,
      EV001_VC_FMSG3  VARCHAR,
      EV001_VC_FMSG4  VARCHAR,
      EV001_VC_FMSG5  VARCHAR,
      EV001_VC_PMSG1  VARCHAR,
      EV001_VC_PMSG2  VARCHAR,
      EV001_VC_IMG1   VARCHAR,
      EV001_VC_IMG2   VARCHAR,
      EV001_IT_ATV1   INTEGER,
      EV001_IT_ATV2   INTEGER,
      EV001_IT_ATV3   INTEGER,
      EV001_IT_SITUAC NUMERIC(2,0),
      EV001_DT_ULTATU TIMESTAMP,
      EV001_DT_INCLUS TIMESTAMP
    );

    _OCCUR := (SELECT
                COUNT(*)
               FROM
                 EV.EV006
               WHERE EV006_IT_VOLUNT = ENT_IT_ID
              );

    IF (_OCCUR >= 10) THEN

        RAISE NOTICE 'ATRAVÉS DAS VISUALIZAÇÕES';

        _ATUAC := (SELECT
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
                  ORDER BY CNT DESC LIMIT 1) T);

        _ATIV1 := (SELECT
                    EV006_IT_ATV1
                  FROM (

                      SELECT
                        EV006_IT_ATV1,
                        COUNT(EV006_IT_ATV1) AS CNT
                      FROM
                        EV.EV006
                      WHERE
                        EV006_IT_VOLUNT = ENT_IT_ID
                      GROUP BY EV006_IT_ATV1
                      ORDER BY CNT DESC LIMIT 1) T);

        _ATIV2 := (SELECT
                    EV006_IT_ATV2
                  FROM (

                      SELECT
                        EV006_IT_ATV2,
                        COUNT(EV006_IT_ATV2) AS CNT
                      FROM
                        EV.EV006
                      WHERE
                        EV006_IT_VOLUNT = ENT_IT_ID
                      GROUP BY EV006_IT_ATV2
                      ORDER BY CNT DESC LIMIT 1) T);

        _ATIV3 := (SELECT
                    EV006_IT_ATV3
                  FROM (

                      SELECT
                        EV006_IT_ATV3,
                        COUNT(EV006_IT_ATV3) AS CNT
                      FROM
                        EV.EV006
                      WHERE
                        EV006_IT_VOLUNT = ENT_IT_ID
                      GROUP BY EV006_IT_ATV3
                      ORDER BY CNT DESC LIMIT 1) T);

        _VECTOR := ARRAY[_ATUAC,
                        LEAST(_ATIV1, _ATIV2, _ATIV3),
                        (_ATIV1 + _ATIV2 + _ATIV3) - LEAST(_ATIV1, _ATIV2, _ATIV3) - GREATEST(_ATIV1, _ATIV2, _ATIV3)
                        ]::INT[];

        INSERT INTO EVENTS (ID, INST, EVENTO, VECTOR, ATUAC, ATV1, ATV2, ATV3)
        (SELECT
          ROW_NUMBER() OVER (ORDER BY EV001_DT_ULTATU),
          AD001_IT_ID,
          EV001_IT_ID,
          ARRAY[AD001_IT_ATUAC, EV001_IT_ATV1, EV001_IT_ATV2]::INT[],
          AD001_IT_ATUAC,
          EV001_IT_ATV1,
          EV001_IT_ATV2,
          EV001_IT_ATV3
        FROM
          EV.EV001 E INNER JOIN AD.AD001 I ON (E.EV001_IT_INST = I.AD001_IT_ID AND E.EV001_IT_SITUAC = 1));

        RAISE NOTICE '%', _VECTOR;

        INSERT INTO SIMILARIDADE (ID, INST, NFANTA, EVENTO, NEVENTO, VECTOR, SIMILARITY, TEXTOSIMILAR)
        (
          SELECT
            ID,
            INST,
            AD001_VC_NFANTA,
            EVENTO,
            EV001_VC_TITULO,
            VECTOR,
            (1-(public.cosine_distance(VECTOR, _VECTOR))),
            public.similarity(array_to_string(ARRAY[ATUAC, ATV1, ATV2], ',', '*'), (array_to_string(ARRAY[_ATUAC, _ATIV1, _ATIV2], ',', '*')))
          FROM
            EVENTS V INNER JOIN AD.AD001 I ON (V.INST = I.AD001_IT_ID)
                    INNER JOIN EV.EV001 E ON (EVENTO = E.EV001_IT_ID AND E.EV001_IT_SITUAC = 1)
          ORDER BY
            (1-( public.cosine_distance(VECTOR, _VECTOR))) DESC
          LIMIT 3
        );

        INSERT INTO EVENTOSFINAIS (
          AD001_VC_NFANTA ,
          AD001_VC_LOGO   ,
          AD001_IT_ATUAC  ,
          AD003_VC_DESC   ,
          EV001_VC_ATV1   ,
          EV001_VC_ATV2   ,
          EV001_VC_ATV3   ,
          EV001_IT_ID     ,
          EV001_IT_INST   ,
          EV001_VC_END    ,
          EV001_IT_NUM    ,
          EV001_VC_COMPL  ,
          EV001_VC_BAIRRO ,
          EV001_VC_CIDADE ,
          EV001_VC_ESTADO ,
          EV001_VC_PAIS   ,
          EV001_VC_TITULO ,
          EV001_DT_INIC   ,
          EV001_HR_INIC   ,
          EV001_DT_FIM    ,
          EV001_HR_FIM    ,
          EV001_IT_NPART  ,
          EV001_VC_FMSG1  ,
          EV001_VC_FMSG2  ,
          EV001_VC_FMSG3  ,
          EV001_VC_FMSG4  ,
          EV001_VC_FMSG5  ,
          EV001_VC_PMSG1  ,
          EV001_VC_PMSG2  ,
          EV001_VC_IMG1   ,
          EV001_VC_IMG2   ,
          EV001_IT_ATV1   ,
          EV001_IT_ATV2   ,
          EV001_IT_ATV3   ,
          EV001_IT_SITUAC ,
          EV001_DT_ULTATU ,
          EV001_DT_INCLUS )
        (

          SELECT
            (SELECT AD001_VC_NFANTA FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT AD001_VC_LOGO FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT AD001_IT_ATUAC FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT A.AD003_VC_DESC FROM AD.AD001 I INNER JOIN AD.AD003 A ON (I.AD001_IT_ATUAC = A.AD003_IT_ID) WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV1 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV1),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV2 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV2),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV3 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV3),
            EV001_IT_ID     ,
            EV001_IT_INST   ,
            EV001_VC_END    ,
            EV001_IT_NUM    ,
            EV001_VC_COMPL  ,
            EV001_VC_BAIRRO ,
            EV001_VC_CIDADE ,
            EV001_VC_ESTADO ,
            EV001_VC_PAIS   ,
            EV001_VC_TITULO ,
            EV001_DT_INIC   ,
            EV001_HR_INIC   ,
            EV001_DT_FIM    ,
            EV001_HR_FIM    ,
            EV001_IT_NPART  ,
            EV001_VC_FMSG1  ,
            EV001_VC_FMSG2  ,
            EV001_VC_FMSG3  ,
            EV001_VC_FMSG4  ,
            EV001_VC_FMSG5  ,
            EV001_VC_PMSG1  ,
            EV001_VC_PMSG2  ,
            EV001_VC_IMG1   ,
            EV001_VC_IMG2   ,
            EV001_IT_ATV1   ,
            EV001_IT_ATV2   ,
            EV001_IT_ATV3   ,
            EV001_IT_SITUAC ,
            EV001_DT_ULTATU ,
            EV001_DT_INCLUS
          FROM
            EV.EV001 E INNER JOIN SIMILARIDADE S ON (E.EV001_IT_ID = S.EVENTO)
        );

    ELSE

      RAISE NOTICE 'ATRAVÉS DAS PREFERENCIAS';

      _PREFER := (SELECT AD005_IT_PREFER FROM AD.AD005 WHERE AD005_IT_VOLUNT = ENT_IT_ID);

      _ATIV1 := (SELECT
                    EV006_IT_ATV1
                  FROM (

                      SELECT
                        EV006_IT_ATV1,
                        COUNT(EV006_IT_ATV1) AS CNT
                      FROM
                        EV.EV006
                      GROUP BY EV006_IT_ATV1
                      ORDER BY CNT DESC LIMIT 1) T);

        _ATIV2 := (SELECT
                    EV006_IT_ATV2
                  FROM (

                      SELECT
                        EV006_IT_ATV2,
                        COUNT(EV006_IT_ATV2) AS CNT
                      FROM
                        EV.EV006
                      GROUP BY EV006_IT_ATV2
                      ORDER BY CNT DESC LIMIT 1) T);

        _ATIV3 := (SELECT
                    EV006_IT_ATV3
                  FROM (

                      SELECT
                        EV006_IT_ATV3,
                        COUNT(EV006_IT_ATV3) AS CNT
                      FROM
                        EV.EV006
                      GROUP BY EV006_IT_ATV3
                      ORDER BY CNT DESC LIMIT 1) T);

        _VECTOR := ARRAY[_PREFER,
                        LEAST(_ATIV1, _ATIV2, _ATIV3),
                        (_ATIV1 + _ATIV2 + _ATIV3) - LEAST(_ATIV1, _ATIV2, _ATIV3) - GREATEST(_ATIV1, _ATIV2, _ATIV3)
                        ]::INT[];

        INSERT INTO EVENTS (ID, INST, EVENTO, VECTOR, ATUAC, ATV1, ATV2, ATV3)
        (SELECT
          ROW_NUMBER() OVER (ORDER BY EV001_DT_ULTATU),
          AD001_IT_ID,
          EV001_IT_ID,
          ARRAY[AD001_IT_ATUAC, EV001_IT_ATV1, EV001_IT_ATV2]::INT[],
          AD001_IT_ATUAC,
          EV001_IT_ATV1,
          EV001_IT_ATV2,
          EV001_IT_ATV3
        FROM
          EV.EV001 E INNER JOIN AD.AD001 I ON (E.EV001_IT_INST = I.AD001_IT_ID AND E.EV001_IT_SITUAC = 1));

        RAISE NOTICE '%', _VECTOR;

        INSERT INTO SIMILARIDADE (ID, INST, NFANTA, EVENTO, NEVENTO, VECTOR, SIMILARITY, TEXTOSIMILAR)
        (
          SELECT
            ID,
            INST,
            AD001_VC_NFANTA,
            EVENTO,
            EV001_VC_TITULO,
            VECTOR,
            (1-(public.cosine_distance(VECTOR, _VECTOR))),
            public.similarity(array_to_string(ARRAY[ATUAC, ATV1, ATV2], ',', '*'), (array_to_string(ARRAY[_ATUAC, _ATIV1, _ATIV2], ',', '*')))
          FROM
            EVENTS V INNER JOIN AD.AD001 I ON (V.INST = I.AD001_IT_ID)
                    INNER JOIN EV.EV001 E ON (EVENTO = E.EV001_IT_ID AND E.EV001_IT_SITUAC = 1)
          ORDER BY
            (1-( public.cosine_distance(VECTOR, _VECTOR))) DESC
          LIMIT 3
        );

        INSERT INTO EVENTOSFINAIS (
          AD001_VC_NFANTA ,
          AD001_VC_LOGO   ,
          AD001_IT_ATUAC  ,
          AD003_VC_DESC   ,
          EV001_VC_ATV1   ,
          EV001_VC_ATV2   ,
          EV001_VC_ATV3   ,
          EV001_IT_ID     ,
          EV001_IT_INST   ,
          EV001_VC_END    ,
          EV001_IT_NUM    ,
          EV001_VC_COMPL  ,
          EV001_VC_BAIRRO ,
          EV001_VC_CIDADE ,
          EV001_VC_ESTADO ,
          EV001_VC_PAIS   ,
          EV001_VC_TITULO ,
          EV001_DT_INIC   ,
          EV001_HR_INIC   ,
          EV001_DT_FIM    ,
          EV001_HR_FIM    ,
          EV001_IT_NPART  ,
          EV001_VC_FMSG1  ,
          EV001_VC_FMSG2  ,
          EV001_VC_FMSG3  ,
          EV001_VC_FMSG4  ,
          EV001_VC_FMSG5  ,
          EV001_VC_PMSG1  ,
          EV001_VC_PMSG2  ,
          EV001_VC_IMG1   ,
          EV001_VC_IMG2   ,
          EV001_IT_ATV1   ,
          EV001_IT_ATV2   ,
          EV001_IT_ATV3   ,
          EV001_IT_SITUAC ,
          EV001_DT_ULTATU ,
          EV001_DT_INCLUS )
        (

          SELECT
            (SELECT AD001_VC_NFANTA FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT AD001_VC_LOGO FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT AD001_IT_ATUAC FROM AD.AD001 WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT A.AD003_VC_DESC FROM AD.AD001 I INNER JOIN AD.AD003 A ON (I.AD001_IT_ATUAC = A.AD003_IT_ID) WHERE AD001_IT_ID = EV001_IT_INST),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV1 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV1),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV2 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV2),
            (SELECT EV002_VC_DESC AS EV001_VC_ATV3 FROM EV.EV002 WHERE EV002_IT_ID = EV001_IT_ATV3),
            EV001_IT_ID     ,
            EV001_IT_INST   ,
            EV001_VC_END    ,
            EV001_IT_NUM    ,
            EV001_VC_COMPL  ,
            EV001_VC_BAIRRO ,
            EV001_VC_CIDADE ,
            EV001_VC_ESTADO ,
            EV001_VC_PAIS   ,
            EV001_VC_TITULO ,
            EV001_DT_INIC   ,
            EV001_HR_INIC   ,
            EV001_DT_FIM    ,
            EV001_HR_FIM    ,
            EV001_IT_NPART  ,
            EV001_VC_FMSG1  ,
            EV001_VC_FMSG2  ,
            EV001_VC_FMSG3  ,
            EV001_VC_FMSG4  ,
            EV001_VC_FMSG5  ,
            EV001_VC_PMSG1  ,
            EV001_VC_PMSG2  ,
            EV001_VC_IMG1   ,
            EV001_VC_IMG2   ,
            EV001_IT_ATV1   ,
            EV001_IT_ATV2   ,
            EV001_IT_ATV3   ,
            EV001_IT_SITUAC ,
            EV001_DT_ULTATU ,
            EV001_DT_INCLUS
          FROM
            EV.EV001 E INNER JOIN SIMILARIDADE S ON (E.EV001_IT_ID = S.EVENTO)
        );

    END IF;

/*===========================================================================*/
/*= RESULT SET                                                              =*/
/*===========================================================================*/
FOR _R IN
  SELECT
    *
  FROM
    EVENTOSFINAIS
  LOOP
    RETURN NEXT _R;
  END LOOP;

  DROP TABLE EVENTS;
  DROP TABLE SIMILARIDADE;
  DROP TABLE EVENTOSFINAIS;

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