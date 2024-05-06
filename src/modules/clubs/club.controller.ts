import { Request, Response } from "express";
import * as clubService from "./club.service";

export const getAllClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await clubService.getAllClubs();
    res.status(200).json({ status: true, body: { message: "All clubs fetched successfully", data: clubs } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getClubById = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await clubService.getClubById(parseInt(clubId));
    res.status(200).json({ status: true, body: { message: "Club data fetched successfully", data: club } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createClub = async (req: Request, res: Response) => {
  try {
    const club = await clubService.createClub(req.body);
    res.status(201).json({ status: true, body: { message: "Club created successfully", data: club } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateClub = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await clubService.updateClub(parseInt(clubId), req.body);
    res.status(200).json({ status: true, body: { message: "Club updated successfully", data: club } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteClub = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await clubService.deleteClub(parseInt(clubId));
    res.status(200).json({ status: true, body: { message: "Club deleted successfully", data: club } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export async function getClubDetailsWithEvents(request: Request, response: Response) {
  try {
    const { clubId } = request.params;
    const data = await clubService.getClubDetailsWithEvents(parseInt(clubId));
    response.status(200).send(
      {
        success: true,
        body: {
          message: "Club details with events fetched successfully",
          data: {
            ...data
          }
        }
      }
    );
  } catch (error) {
    console.error("Error in getClubDetailsWithEvents", error);
    response.status(500).send(error);
  }
}