-- #1
SELECT Fname, Lname FROM Players 
ORDER BY AGE(FinalGame, Debut) DESC LIMIT 1;

-- #2
SELECT AVG(Height) FROM Players 
WHERE DATE_PART('year',Debut) >= 1950;

-- #3
SELECT Pl.Fname, Pl.Lname, Pi.G
FROM Players Pl NATURAL JOIN Pitching Pi
LEFT OUTER JOIN Batting B 
ON B.TeamID = Pi.TeamID AND B.Year = Pi.Year 
GROUP BY Fname, Lname, Pi.G
ORDER BY MAX(Pi.G) DESC LIMIT 1;

-- #4
SELECT Fname, Lname, Year, Stint, 
SUM(H) + SUM(2*B2) + SUM(3*B3) + SUM(4*HR) AS Total
FROM Players P, Batting B 
WHERE B.PlayerID = P.PlayerID 
GROUP BY Fname, Lname, Year, Stint;

-- #5
SELECT Fname, Lname, B.Year, B.Stint, COUNT(RBI)                 
FROM Pitching P1, Batting B, Players P2
WHERE P2. PlayerID = B.PlayerID 
AND P1.TeamID = B.TeamID AND P1.Year = B.Year 
AND P1.Stint = B.Stint
GROUP BY Fname, Lname, B.Year, B.Stint
ORDER BY COUNT(RBI) DESC LIMIT 5;

-- #6
SELECT COUNT(SB), AVG(Weight) 
FROM Players P, Batting B 
WHERE P.PlayerID = B.PlayerID 
GROUP BY Stint
ORDER BY Count(SB);

-- #7
SELECT COUNT(B.R), T.Year, T.LgWin
FROM Teams T LEFT OUTER JOIN Batting B 
ON T.TeamID = B.TeamID AND B.Year = T.Year 
GROUP BY T.TeamID, T.Year; 

-- #8
SELECT T.Name, T.Year, COUNT(Pl.PlayerID)
FROM Players Pl NATURAL JOIN Batting B 
LEFT OUTER JOIN Pitching Pi 
ON Pi.TeamID = B.TeamID
LEFT OUTER JOIN Teams T
ON B.Year = T.Year AND T.TeamID = B.TeamID
WHERE T.G > 5 AND T.Year > 2000
AND EXISTS (SELECT COUNT(Pl.PlayerID) > 25
FROM Players Pl NATURAL JOIN Batting B 
LEFT OUTER JOIN Pitching Pi 
ON Pi.TeamID = B.TeamID
LEFT OUTER JOIN Teams T
ON B.Year = T.Year AND T.TeamID = B.TeamID
GROUP BY T.TeamID) 
GROUP BY T.TeamID, T.Name, T.Year;

-- #9
SELECT BirthMonth, Count(*)
FROM Players P, Teams T, Batting B
WHERE T.TeamID = B.TeamID
AND B.PlayerID = P.PlayerID
AND T.Year = B.Year AND T.Year = 2004
AND T.Name = 'Boston Red Sox' 
GROUP BY BirthMonth;

-- #10
SELECT Pi.Year, Fname, Lname, Name, SO
FROM Players Pl NATURAL JOIN Pitching Pi 
LEFT OUTER JOIN Teams T
ON T.TeamID = Pi.TeamID AND T.Year = Pi.Year
WHERE SO IN (SELECT MAX(SO) FROM Pitching 
GROUP BY Year ORDER BY Year DESC);
